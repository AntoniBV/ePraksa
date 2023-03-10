const mssql = require("mssql");
const dbconfig = require("./dbconfig");

const ROLES = ["admin", "Professors", "Mentors", "Students"];

// Login function - destructuring req.query and posting request to database query
const handleLogin = async (req, res, role = ROLES[0]) => {
  const { username, password } = req.query;

  const SQL = `SELECT * FROM ${role} WHERE ${
    role == "admin" ? "korisnicko_ime" : "UserName"
  } = '${username}'`;
  console.log(SQL);

  await mssql.connect(dbconfig);
  const request = new mssql.Request();

  request.query(SQL, (error, result) => {
    error ? res.json({ error }) : null;
    console.log(result);
    const { recordset: rawdata } = result;
    const [userdata] = rawdata;
    if (userdata) {
      userdata.role = role;
      if (userdata.hasOwnProperty("lozinka")) {
        userdata.Password = userdata.lozinka;
        delete userdata.lozinka;
      }
      res.json(
        userdata.Password == password ? userdata : { error: "WRONG_PASSWORD" }
      );
    } else {
      if (ROLES.indexOf(role) == ROLES.length - 1) {
        res.json({ error: "NO_USER_FOUND" });
        return;
      }
      handleLogin(req, res, ROLES[ROLES.indexOf(role) + 1]);
    }
  });
};

// Formating passed values from [val1, val2, val3] to "val1, val2, val3"
const formatValues = (values) => {
  const valuesArr = values.split(`,`);

  let SQLvalues = "";
  valuesArr.forEach((value, i) => {
    value = `'${value}'`;
    SQLvalues += value;
    if (i + 1 < valuesArr.length) SQLvalues += ",";
  });

  return SQLvalues;
};

// Fetching wanted type of users from db
const fetchUsers = async (req) => {
  const { role, id } = req.query;
  console.log(role, id);
  let newRole = role,
    newID = id;
  if (role == "firma") {
    newRole = "Firms";
    newID = "FirmId";
  }

  const SQL =
    `SELECT * FROM ${newRole}` + (id ? ` WHERE ${newID} = ${id}` : ``);

  await mssql.connect(dbconfig);
  const request = new mssql.Request();

  const result = await request.query(SQL);
  const { recordset: rawdata } = result;

  return rawdata;
};

// Fetching wanted internships
const fetchInternships = async () => {
  const SQL = `SELECT * FROM Internships`;

  await mssql.connect(dbconfig);
  const request = new mssql.Request();

  const result = await request.query(SQL);
  const { recordset: rawdata } = result;
  console.log(rawdata);

  return rawdata;
};

// Fetch Firm + Quotas
const fetchQuotas = async (req) => {
  const { id } = req.query;

  const SQL =
    `SELECT Firms.FirmID, Firms.Name, Firms.Description, InternshipFirmQuotas.IntershipFirmQuataId, 
    InternshipFirmQuotas.IntershipId, InternshipFirmQuotas.QuotaMaxPlan,
    InternshipFirmQuotas.QuotaStartNumber, InternshipFirmQuotas.QuotaFinal, InternshipFirmQuotas.DescriptionOfQuotaCondition,
    InternshipFirmQuotas.IsActive, InternshipFirmQuotas.Comments
	FROM Firms
	LEFT JOIN InternshipFirmQuotas
	ON Firms.FirmID = InternshipFirmQuotas.FirmId where IntershipFirmQuataId IS NOT NULL` +
    (id ? `WHERE IntershipFirmQuataId = ${id}` : ``);

  await mssql.connect(dbconfig);
  const request = new mssql.Request();

  const result = await request.query(SQL);
  const { recordset: rawdata } = result;
  console.log(rawdata);

  return rawdata;
};

// Delete Quote

// Selecting size of all tables to get number of each type of users to display in dashboard
const getSize = async (role) => {
  const SQL = `SELECT (SELECT COUNT(*) FROM Students) AS broj_studenata,
    (SELECT COUNT(*) FROM Professors) AS broj_profesora,
    (SELECT COUNT(*) FROM Mentors) AS broj_mentora,
    (SELECT COUNT(*) FROM Firms) AS broj_firmi,
    (SELECT COUNT(*) FROM Faculties) AS broj_fakulteta`;

  await mssql.connect(dbconfig);
  const request = new mssql.Request();

  const result = await request.query(SQL);
  const { recordset: rawdata } = result;

  return rawdata;
};

// Exporting functions
module.exports = {
  handleLogin,
  formatValues,
  fetchUsers,
  getSize,
  fetchInternships,
  fetchQuotas,
};

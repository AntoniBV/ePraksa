const keyTranslations = {
  Name: "Name",
  Description: "Description",
  FirmTypeId: "FirmTypeID",
  CityId: "CityId",
  Street: "Street",
  StreetNumber: "StreetNumber",
  PostalNumber: "PostalNumber",
  selectedInternshipTypes: "InternshipTypes",
  CreationDateTime: "CreationDateTime",


  IntershipFirmQuataId: "IntershipFirmQuataId",
  QuotaFinal: "QuotaFinal",
  FirmId: "FirmId",
  IntershipId: "IntershipId",
  QuotaMaxPlan: "QuotaMaxPlan",
  QuotaStartNumber: "QuotaStartNumber",
  DescriptionOfQuotaCondition: "DescriptionOfQuotaCondition",
  IsActive: "IsActive",
  Comments: "Comments",
  CityId: "CityId",
  FirmTypeID: "FirmTypeID",
};

const handleKeyTranslation = (key) => {
  return keyTranslations[key];
};

const propsTranslations = {
  Name: "Name",
  Description: "Description",
  FirmTypeId: "FirmTypeID",
  CityId: "CityId",
  Street: "Street",
  StreetNumber: "StreetNumber",
  PostalNumber: "PostalNumber",
  selectedInternshipTypes: "InternshipTypes",
  CreationDateTime: "CreationDateTime",


  IntershipFirmQuataId: "IntershipFirmQuataId",
  QuotaFinal: "QuotaFinal",
  FirmId: "FirmId",
  IntershipId: "IntershipId",
  QuotaMaxPlan: "QuotaMaxPlan",
  QuotaStartNumber: "QuotaStartNumber",
  DescriptionOfQuotaCondition: "DescriptionOfQuotaCondition",
  IsActive: "IsActive",
  Comments: "Comments",
  CityId: "CityId",
  FirmTypeID: "FirmTypeID",
};

const handleAddUserToDb = (data, role) => {
  console.log(data);
  const columns = Object.keys(data).map((key) => propsTranslations[key]);
  const values = Object.values(data);
  console.log(role);
  fetch(
    `http://localhost:4000/adduser?columns=${columns}&values=${values}&role=${role}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => error);
};

const handleDeleteQuote = (id) => {
  fetch(`http://localhost:4000/deletequota?id=${id}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => error);
};

const handleAddQuotaToDb = (data) => {
  console.log("abv");
  console.log(data);
  const columns = Object.keys(data).map((key) => propsTranslations[key]);
  const values = Object.values(data);
  fetch(`http://localhost:4000/addquota?columns=${columns}&values=${values}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => error);
};

const handleUpdateUser = (data, role) => {
  let id = data.id;
  let newRole = role,
    newID = id;
  if (role == "mentor") {
    newRole = "Mentors";
    newID = "MentorId";
    id = data.MentorId;
    delete data.MentorId;
  }
  if (role == "profesor") {
    newRole = "Professors";
    newID = "ProfessorId";
    id = data.ProfessorId;
    delete data.ProfessorId;
  }
  if (role == "firma") {
    newRole = "Firms";
    newID = "FirmId";
    id = data.FirmId;
    delete data.FirmId;
  }

  delete data.id;

  const columns = Object.keys(data);
  const values = Object.values(data);

  let sql = `UPDATE ${newRole} SET `;

  columns.forEach((column, i) => {
    console.log(i, columns.length);
    let line = `${column} = '${values[i]}'`;
    const islast = i == columns.length - 1;
    console.log(islast);
    const spacing = i == columns.length - 1 ? `` : `, `;
    line += spacing;
    sql += line;
  });

  sql += ` WHERE FirmId = ${id}`;

  fetch(`http://localhost:4000/updateuser?sql=${sql}`);
};

const handleUpdateQuote = (data) => {
  let id = data.id;

  delete data.id;

  const columns = Object.keys(data);
  const values = Object.values(data);

  let sql = `UPDATE InternshipFirmQuotas SET `;

  columns.forEach((column, i) => {
    console.log(i, columns.length);
    let line = `${column} = '${values[i]}'`;
    const islast = i == columns.length - 1;
    console.log(islast);
    const spacing = i == columns.length - 1 ? `` : `, `;
    line += spacing;
    sql += line;
  });

  sql += ` WHERE IntershipFirmQuataId = ${id}`;

  fetch(`http://localhost:4000/updatequote?sql=${sql}`);
};

const handleAddRequestToDb = (data) => {
  const columns = Object.keys(data);
  const values = Object.values(data);
  console.log(
    `http://localhost:4000/addrequest?columns=${columns}&values=${values}&role=zahtjev`
  );
  fetch(
    `http://localhost:4000/addrequest?columns=${columns}&values=${values}&role=zahtjev`
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => error);
};

export {
  handleKeyTranslation,
  handleAddUserToDb,
  handleUpdateUser,
  handleAddRequestToDb,
  handleAddQuotaToDb,
  handleUpdateQuote,
};

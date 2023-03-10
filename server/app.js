const express = require("express");
const mssql = require("mssql");
const cors = require("cors");
const dbconfig = require("./dbconfig");

//handlersLib
const { handleLogin, formatValues, fetchUsers, getSize, fetchInternships, fetchQuotas } = require("./handlerslib");

// Basic express configuration, express is used to process requests posted by client
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 4000;

// Handling login request from the client
app.get("/login", (req, res) => {
    handleLogin(req, res);
});

app.get("/getQuota", async (req, res) => {
    const data = await fetchQuotas(req);
    res.json(data);
});

// Handling request to display fetch users with selected role
app.get("/getusers", async (req, res) => {
    const data = await fetchUsers(req);
    res.json(data);
});

// moj dio
// Handling request to display fetch internships
app.get("/getinternships", async (req, res) => {
    const data = await fetchInternships();
    res.json(data);
});
// kraj



// Handling request to add user to database
app.get("/adduser", async (req, res) => {
    const { columns, values, role } = req.query;

    const SQLvalues = formatValues(values);

    const SQL = `INSERT INTO ${role} (${columns}) VALUES (${SQLvalues})`;
    console.log(SQL);

    await mssql.connect(dbconfig);
    const request = new mssql.Request();

    request.query(SQL, (error, result) => {
        error ? res.json({ error }) : res.json({ result });
    });
});



app.get("/addquota", async (req, res) => {
    const { columns,values } = req.query;

    const SQLvalues = formatValues(values);

    const SQL = `INSERT INTO InternshipFirmQuotas (${columns}) VALUES (${SQLvalues})`;
    console.log(SQL);

    await mssql.connect(dbconfig);
    const request = new mssql.Request();

    request.query(SQL, (error, result) => {
        error ? res.json({ error }) : res.json({ result });
    })
});
/*
app.get("/addQuota", async (req, res) => {
    const data = await fetchSelectedAnnoucement(req);
    res.json(data);
  });
*/


// Handling request to add request for "firma" or "mentor" to database
app.get("/addrequest", async (req, res) => {
    const { columns, values, role } = req.query;

    const SQLvalues = formatValues(values);

    const colArr = columns.split(",");
    const valArr = values.split(",");
    console.log(colArr);
    console.log(valArr);
    console.log(values[0]);

    const mentorId = colArr.indexOf("mentor_id");
    const studentId = colArr.indexOf("student_id");
    const firmaId = colArr.indexOf("firma_id");

    const SQL = `IF EXISTS (SELECT * FROM zahtjev WHERE (mentor_id = ${
        valArr[mentorId]
    } AND firma_id = '${valArr[firmaId] == undefined ? null : valArr[firmaId]}' AND student_id = ${
        valArr[studentId]
    }))
                SELECT 0
                ELSE
                INSERT INTO ${role} (${columns}) VALUES (${SQLvalues})`;
    console.log(SQL);
    await mssql.connect(dbconfig);
    const request = new mssql.Request();

    request.query(SQL, (error, result) => {
        error ? res.json({ error }) : res.json({ result });
    });
});

// Handling request to update selected user
app.get("/updateuser", async (req, res) => {
    const { sql } = req.query;
    console.log(sql);
    await mssql.connect(dbconfig);
    const request = new mssql.Request();

    request.query(sql, (error, result) => {
        console.log(error);
        error ? res.json({ error }) : res.json({ result });
    });
});

// Update kvote
app.get("/updatequote", async (req, res) => {
    const { sql } = req.query;
    console.log(sql);
    await mssql.connect(dbconfig);
    const request = new mssql.Request();

    request.query(sql, (error, result) => {
        console.log(error);
        error ? res.json({ error }) : res.json({ result });
    });
});




app.get("/deleteQuote", async (req, res) => {
    const { id } = req.query;

    const SQL = `DELETE FROM InternshipFirmQuotas WHERE IntershipFirmQuataId = '${id}'`;

    console.log(SQL);

    await mssql.connect(dbconfig);
    const request = new mssql.Request();
    try {
        request.query(SQL, (error, result) => {
            error ? res.json({ error }) : res.json({ result });
        });
    } catch (error) {
        console.log(error);
    }
});

// Handling request to delete selected user
app.get("/deleteuser", async (req, res) => {
    const { role, id } = req.query;

    const SQL = `DELETE FROM ${role} WHERE id = '${id}'`;

    console.log(SQL);

    await mssql.connect(dbconfig);
    const request = new mssql.Request();
    try {
        request.query(SQL, (error, result) => {
            error ? res.json({ error }) : res.json({ result });
        });
    } catch (error) {
        console.log(error);
    }
});

// Handling request to get number of users stored in database
app.get("/getsize", async (req, res) => {
    const data = await getSize();
    const [spreaddata] = data;
    res.json(spreaddata);
});

// Object which was used for request status
const updates = {
    MENTOR: "mentor_potvrden",
    FIRMA: "firma_potvrden",
    STUDENT: "student_potvrden",
};

// Handling request updates -> if mentor accepts request for mentorship or if request for "firma" needs to be updated
app.get("/handlerequest", async (req, res) => {
    const { id, vrsta, caller, decision } = req.query;

    let SQL = ``;
//ovdje treba ispravit kako bi se moglo vuc iz nove baze podataka i prikazat tamo
    if (vrsta == "mentor") {
        if (decision == "accepted") {
            SQL = `UPDATE student SET mentor_id = (SELECT mentor_id FROM zahtjev WHERE id = ${id}) WHERE id = (SELECT student_id FROM zahtjev WHERE id = ${id});`;
        }
        SQL += `DELETE FROM zahtjev WHERE id = ${id};`;
    } else {
        //vrsta == "firma"
        if (decision == "rejected") {
            SQL = `DELETE FROM zahtjev WHERE id = ${id}`;
        } else {
            if (caller == "mentor") {
                SQL = `UPDATE zahtjev SET mentor_potvrden = '1' WHERE id = ${id}`;
            } else {
                //caller == "firma"
                SQL = `UPDATE zahtjev SET firma_potvrden = '1' WHERE id = ${id}; UPDATE student SET odabrana_firma_id = (SELECT firma_id FROM zahtjev WHERE id = ${id}) WHERE id = (SELECT student_id FROM zahtjev WHERE id = ${id})`;
            }
        }
    }

    await mssql.connect(dbconfig);
    const request = new mssql.Request();

    try {
        request.query(SQL, (error, result) => {
            error ? res.json({ error }) : res.json({ result });
        });
    } catch (error) {
        console.log(error);
    }
    console.log(`REQUEST ${vrsta} IS HERE:`, SQL);
});

// Defining port on which is express going to listen for requests
app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}!`);
});

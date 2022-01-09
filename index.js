const inquirer = require('inquirer');
const db = require('./db/connection');


// db.connect(function(error) {
//     if(error) throw error;
//     console.log('connected at ' + db.threadId+"\n");
// })

const firstQuestion = function() {
    console.log(`
================================
Welcome to the employee manager!
================================`)

    return inquirer.prompt([
        {
            type: 'list',
            name: 'firstQuestion',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'View All Roles', 'View All Departments']
        }
    ])
    .then(data => {
        const { firstQuestion } = data;
        // console.log(firstQuestion);
        if (firstQuestion == 'View All Employees') {
            const sql = `SELECT employee.*, role.title AS Job_Title FROM employee LEFT JOIN role ON employee.role_id = role.id`;
            db.query(sql, (err, rows) => {
                if(err) {
                    console.log('error')
                    return;
                }
                console.table(rows)
            })
            
        }
        else if (firstQuestion == 'View All Roles') {
            const sql = `SELECT role.*, department.departmentName FROM role LEFT JOIN department ON role.department_id = department.id`;
            db.query(sql, (err, rows) => {
                if(err) {
                    console.log('error')
                    return;
                }
                console.table(rows)
            })
        }
        else if (firstQuestion == 'View All Departments') {
            const sql = `SELECT * FROM department`;
            db.query(sql, (err, rows) => {
                if(err) {
                    console.log('error')
                    return;
                }
                console.table(rows)
            })
        }
    })
}

firstQuestion();
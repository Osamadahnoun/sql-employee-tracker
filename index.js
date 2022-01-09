const inquirer = require('inquirer');
const db = require('./db/connection');


// db.connect(function(error) {
//     if(error) throw error;
//     console.log('connected at ' + db.threadId+"\n");
// })

const chooseQuery = () => {
//     console.log(`
// ================================
// Welcome to the employee manager!
// ================================`)

    return inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'View All Roles', 'View All Departments', 'Add Department', 'Add Role']
        },
        // {
        //     type: 'input',
        //     name: 'departmentName',
        //     message: 'What is the name of the department?',
        //     when: ({ choice }) =>  choice == 'Add Department'
        // },

    ])
    .then(data => {
        const { choice } = data;
        // console.log(firstQuestion);
        if (choice == 'View All Employees') {
            const sql = `SELECT employee.*, role.title AS Job_Title FROM employee LEFT JOIN role ON employee.role_id = role.id`;
            db.query(sql, (err, rows) => {
                if(err) {
                    console.log('error')
                    return;
                }
                console.table(rows)
                chooseQuery()
            })
        }
        else if (choice == 'View All Roles') {
            const sql = `SELECT role.*, department.departmentName FROM role LEFT JOIN department ON role.department_id = department.id`;
            db.query(sql, (err, rows) => {
                if(err) {
                    console.log('error')
                    return;
                }
                console.table(rows)
                chooseQuery()
            })
        }
        else if (choice == 'View All Departments') {
            const sql = `SELECT * FROM department`;
            db.query(sql, (err, rows) => {
                if(err) {
                    console.log('error')
                    return;
                }
                console.table(rows)
                chooseQuery()
            })
        }
        else if (choice == 'Add Department') {
            addDepartment()
        }
        else if (choice == 'Add Role') {
            addRole()
        }
    })
}

const addDepartment = () => {
    return inquirer.prompt([
        {
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department?'
        }
    ])
    .then(data => {
        const { departmentName } = data
        if (departmentName) {
            const sql = `INSERT INTO department (departmentName) VALUES (?)`;
            const params = [departmentName]
            db.query(sql, params, (err, rows) => {
                if(err) {
                    console.log('error')
                    return;
                }
                console.log(`Added ${departmentName} to the database.`)
                chooseQuery()
            })
        }
    }
    )};

const addRole = () => {
    return inquirer.prompt([
        {
        type: 'input',
        name: 'roleName',
        message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary of the role?'   
        },
        {
        type: 'input',
        name: 'roleDepartment',
        message: 'Which department does the role belong to? 1 = (Engineering) 2 = (Finance) 3 = (Legal) 4 = (Sales).',
        // choices: ['Engineering', 'Finance', 'Legal', 'Sales']
        }
    ])
    .then(data => {
        const { roleName, roleSalary, roleDepartment } = data
        if (roleName) {
            const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
            const params = [roleName, roleSalary, roleDepartment]
            db.query(sql, params, (err, rows) => {
                if(err) {
                    console.log('error')
                    return;
                }
                console.log(`Added ${roleName} to the database.`)
                chooseQuery()
            })
        }
    }
    )
};

chooseQuery()
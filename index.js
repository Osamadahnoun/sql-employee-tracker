const { byteLength } = require('base64-js');
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
            choices: ['View All Employees', 'View All Roles', 'View All Departments', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update Employee Role', 'Quit']
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
        else if (choice == 'Add a Department') {
            addDepartment()
        }
        else if (choice == 'Add a Role') {
            addRole()
        }
        else if (choice == 'Add an Employee') {
            addEmployee()
        }
        else if (choice == 'Update Employee Role') {
            updateEmployee()
        }
        else if (choice == 'Quit') {
            exitInquirer()
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

const addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'employeeFirstName',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'employeeLastName',
            message: "What is the employee's last name?"
        },
        {
            type: 'input',
            name: 'employeeRole',
            message: "What is the employee's role? 1 = (Sales Lead) 2 = (Salesperson) 3 = (Lead Engineer) 4 = (Software Engineer) 5 = (Account Manager) 6 = (Accountant) 7 = (Legal Team Lead) 8 = (Lawyer)"
        },
        {
            type: 'input',
            name: 'employeeManager',
            message: "Who is the employees's manager? 1 = (Osama Dahnoun) 2 = (John Doe)"
        }
    ])
    .then(data => {
        const { employeeFirstName, employeeLastName, employeeRole, employeeManager } = data;
        if (employeeFirstName) {
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
            const params = [employeeFirstName, employeeLastName, employeeRole, employeeManager]
            db.query(sql, params, (err, rows) => {
                if(err) {
                    console.log('error')
                    return;
                }
                console.log('Added ' + employeeFirstName + ' ' + employeeLastName + ' to the database.')
                chooseQuery()
            })
        }

    })
}

const updateEmployee = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employeeName',
            message: "Which employee's role do you want to update?",
            choices: ['John', 'Osama', 'Ashley', 'Kevin']
        },
        {
            type: 'input',
            name: 'employeeRole',
            message: 'Which role do you want to assign the selected employee? 1 = (Sales Lead) 2 = (Salesperson) 3 = (Lead Engineer) 4 = (Software Engineer) 5 = (Account Manager) 6 = (Accountant) 7 = (Legal Team Lead) 8 = (Lawyer)'
        }
    ])

    .then(data => {
        const { employeeName, employeeRole } = data;
        const sql = `UPDATE employee SET role_id = ? WHERE first_name = ?`;
        const params = [employeeRole, employeeName];
        db.query(sql, params, (err, rows) => {
            if(err) {
                console.log('error')
                return;
            }
            console.log("Updated employee's role")
            chooseQuery()
        })
    }
    )
}

const exitInquirer = () => {
    console.log('Gooodbye! Come back anytime!')
}


chooseQuery()
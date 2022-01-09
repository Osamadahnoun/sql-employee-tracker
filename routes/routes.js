const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/department', (req, res) => {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        if(err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        })
    })
});

router.get('/role', (req, res) => {
    const sql = `SELECT role.*, department.departmentName FROM role LEFT JOIN department ON role.department_id = department.id`;

    db.query(sql, (err, rows) => {
        if(err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        })
    })
});

router.get('/employee', (req, res) => {
    const sql = `SELECT employee.*, role.title AS Job_Title FROM employee LEFT JOIN role ON employee.role_id = role.id`;

    db.query(sql, (err, rows) => {
        if(err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        })
    })
});



module.exports = router;
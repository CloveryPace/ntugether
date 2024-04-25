const express = require('express');

// controllers for activity
exports.getActivitiesList = (req, res) => {

    connection.query(
        'SELECT * FROM Activities',
        (error, results, fields) => {
            if (error) {
                console.error('Error executing MySQL query: ' + error.stack);
                return res.status(500).send('Error executing MySQL query');
            }

            // Check if any rows were affected by the update
            if (results.affectedRows === 0) {
                return res.status(404).send('activity does not exist');
            }

            // Send success response
            first_two_activities = results.slice(0, 2);
            res.json(first_two_activities);
        });

};

exports.deleteActivity = (req, res) => {

};

exports.getAllApplications = (req, res) => { };

exports.removeUser = (req, res) => { };

exports.applyActivity = (req, res) => { };

exports.getDiscussion = (req, res) => { };

exports.makeDiscussion = (req, res) => { };
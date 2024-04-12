/* create and use database */
Drop database ntugetherdb;
CREATE DATABASE IF NOT EXISTS `ntugetherdb`;
USE ntugetherdb;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    birthday DATE,
    gender VARCHAR(50),
    photo BLOB,
    self_introduction TEXT,
    interests TEXT -- JSON array to store list of interests
);

CREATE TABLE Userinterests (
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    interest VARCHAR(20),
    foreign key (user_id) references users(user_id)
);

-- Activity Table
CREATE TABLE Activities (
    activity_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    introduction TEXT NOT NULL,
    date DATE NOT NULL,
    -- type JSON, -- JSON array to store list of types
    location VARCHAR(255),
    max_participants INT,
    need_reviewed BOOLEAN,
    is_one_time BOOLEAN,
    created_user_id INT,
    application_problem VARCHAR(255),
    check_by_organizer BOOLEAN,
    FOREIGN KEY (created_user_id) REFERENCES Users(user_id)
) ENGINE=InnoDB;

-- Long-term Activity Table
CREATE TABLE LongTermActivities (
    long_term_activity_id INT AUTO_INCREMENT PRIMARY KEY,
    activity_id INT NOT NULL,
    date DATETIME NOT NULL,
    last_activity_id INT,
    -- check_by_organizer BOOLEAN,
    FOREIGN KEY (activity_id) REFERENCES Activities(activity_id),
    FOREIGN KEY (last_activity_id) REFERENCES LongTermActivities(long_term_activity_id)
) ENGINE=InnoDB;

-- Activity Participant Status Table
CREATE TABLE ActivityParticipantStatus (
    aps_id INT AUTO_INCREMENT PRIMARY KEY,
    activity_id INT,
    long_term_activity_id INT,
    participant_id INT,
    FOREIGN KEY (long_term_activity_id) REFERENCES LongTermActivities(long_term_activity_id),
    FOREIGN KEY (activity_id) REFERENCES Activities(activity_id),
    FOREIGN KEY (participant_id) REFERENCES Users(user_id)
) ENGINE=InnoDB;

-- Application Table
CREATE TABLE Applications (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    activity_id INT,
    application_response TEXT,
    applicant_id INT,
    is_approved BOOLEAN,
    FOREIGN KEY (activity_id) REFERENCES Activities(activity_id),
    FOREIGN KEY (applicant_id) REFERENCES Users(user_id)
) ENGINE=InnoDB;

-- Invitations Table
CREATE TABLE Invitations (
    invitation_id INT AUTO_INCREMENT PRIMARY KEY,
    inviter_id INT,
    invitee_id INT,
    activity_id INT,
    FOREIGN KEY (inviter_id) REFERENCES Users(user_id),
    FOREIGN KEY (invitee_id) REFERENCES Users(user_id),
    FOREIGN KEY (activity_id) REFERENCES Activities(activity_id)
) ENGINE=InnoDB;

-- Plans Table
CREATE TABLE Plans (
    plan_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    goal VARCHAR(255),
    -- type varchar(20),
    introduction TEXT,
    created_user_id INT,
    progression TEXT, -- Consider using a structured format or linking to a separate table for complex types
    start_date DATETIME,
    end_date DATETIME,
    application_problem VARCHAR(255),
    FOREIGN KEY (created_user_id) REFERENCES Users(user_id)
) ENGINE=InnoDB;

-- PlanTypes Table to store unique plan types
CREATE TABLE PlanTypes (
    plan_type_id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(255) UNIQUE NOT NULL
) ENGINE=InnoDB;

-- PlanTypeAssociations Table to link Plans and PlanTypes
CREATE TABLE PlanTypeAssociations (
    plan_id INT,
    plan_type_id INT,
    PRIMARY KEY (plan_id, plan_type_id),
    FOREIGN KEY (plan_id) REFERENCES Plans(plan_id),
    FOREIGN KEY (plan_type_id) REFERENCES PlanTypes(plan_type_id)
) ENGINE=InnoDB;

-- Discussions Table
CREATE TABLE Discussions (
    discussion_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    plan_id INT,
    content varchar(255),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (plan_id) REFERENCES Plans(plan_id)
) ENGINE=InnoDB;

CREATE TABLE Progress (
    progress_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    introduction TEXT,
    date DATETIME,
    need_activity BOOLEAN,
    activity_interval INT default 3,
    type varchar(20), 
    plan_id INT,
    FOREIGN KEY (plan_id) REFERENCES Plans(plan_id)
) ENGINE=InnoDB;

CREATE TABLE UserPlan (
    user_plan_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    plan_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (plan_id) REFERENCES Plans(plan_id)
) ENGINE=InnoDB;

CREATE TABLE UserProgress (
    user_progress_id INT AUTO_INCREMENT PRIMARY KEY,
    user_plan_id INT,
    is_finished BOOLEAN,
    progress_id INT, -- Assuming it relates to a specific progress instance
    FOREIGN KEY (user_plan_id) REFERENCES UserPlan(user_plan_id),
    FOREIGN KEY (progress_id) REFERENCES Progress(progress_id)
) ENGINE=InnoDB;


/* Insert into fake data */
-- Users Table
INSERT INTO Users (name, email, password, birthday, gender, interests) VALUES
('John Doe', 'john@example.com', 'password123', '1990-05-15', 'Male', '["Hiking", "Reading", "Cooking"]'),
('Jane Smith', 'jane@example.com', 'password456', '1985-09-20', 'Female', '["Painting", "Yoga", "Photography"]'),
('Alice Johnson', 'alice@example.com', 'password789', '1995-02-10', 'Female', '["Traveling", "Skiing", "Gardening"]');

-- INSERT INTO Users (name, email, password) VALUES
-- ('test', 'test@gmail.com', 'testpassword');

-- DELETE FROM Users WHERE user_id = 4;

-- Activities Table
INSERT INTO Activities (name, introduction, date, location, max_participants, need_reviewed, is_one_time, created_user_id, application_problem, check_by_organizer) VALUES
('Hiking Trip', 'Join us for a day of hiking in the nearby mountains.', '2024-05-01', 'Mountain Trail', 20, 0, 1, 1, 'None', 1),
('Photography Workshop', 'Learn photography basics and improve your skills.', '2024-04-15', 'Community Center', 15, 1, 0, 2, 'None', 0),
('Cooking Class', 'A hands-on cooking class to learn new recipes.', '2024-04-20', 'Culinary School', 10, 1, 0, 3, 'None', 0);

-- Long-term Activity Table
INSERT INTO LongTermActivities (activity_id, date, last_activity_id, check_by_organizer) VALUES
(1, '2024-05-01 09:00:00', NULL, 1),
(2, '2024-04-15 14:00:00', NULL, 0),
(3, '2024-04-20 18:00:00', 2, 0);

-- Activity Participant Status Table
INSERT INTO ActivityParticipantStatus (activity_id, long_term_activity_id, participant_id) VALUES
(1, NULL, 2),
(2, 1, 1),
(3, NULL, 3);

-- Applications Table
INSERT INTO Applications (activity_id, application_response, applicant_id, is_approved) VALUES
(2, 'I`m excited to learn more about photography!', 1, 1),
(3, 'Looking forward to cooking some delicious dishes!', 3, 1),
(1, 'Can`t wait to explore the mountains!', 2, 0);

-- Invitations Table
INSERT INTO Invitations (inviter_id, invitee_id, activity_id) VALUES
(1, 3, 1),
(2, 1, 3),
(3, 2, 2);

-- Plans Table
INSERT INTO Plans (name, goal, introduction, created_user_id, start_date, end_date, application_problem) VALUES
('Fitness Challenge', 'Get in shape and improve overall health.', 'Join our fitness challenge and achieve your fitness goals!', 1, '2024-04-01', '2024-06-30', 'Finding time for workouts'),
('Book Reading Club', 'Read and discuss interesting books.', 'Let`s read and discuss great books together!', 2, '2024-04-05', '2024-06-30', 'Finding time to read'),
('Travel Bucket `List`', 'Explore `new` destinations `and` cultures.', 'Embark `on` exciting travel adventures!', 3, '2024-05-01', '2024-12-31', 'Planning trips');

INSERT INTO PlanTypes (type_name) VALUES
('Sport'),
('Education'),
('Hobby');

-- PlanTypeAssociations Table
INSERT INTO PlanTypeAssociations (plan_id, plan_type_id) VALUES
(1, 1),
(2, 2),
(3, 3);

-- Discussions Table
INSERT INTO Discussions (user_id, plan_id, content) VALUES
(1, 1, 'Let`s share our workout routines and progress!'),
(2, 2, 'What book should we read next?'),
(3, 3, 'Recommendations for must-visit travel destinations?');

-- Progress Table
INSERT INTO Progress (name, introduction, date, need_activity, activity_interval, type, plan_id) VALUES
('Week 1 Progress', 'Update your progress for the first week.', '2024-04-07 12:00:00', 1, 7, 'Fitness', 1),
('Chapter 1 Discussion', 'Discuss Chapter 1 of the selected book.', '2024-04-10 18:00:00', 0, NULL, 'Reading', 2),
('Trip Planning', 'Start planning your next travel destination.', '2024-04-15 09:00:00', 0, NULL, 'Travel', 3);

-- UserPlan Table
INSERT INTO UserPlan (user_id, plan_id) VALUES
(1, 1),
(2, 2),
(3, 3);

-- UserProgress Table
INSERT INTO UserProgress (user_plan_id, is_finished, progress_id) VALUES
(1, 0, 1),
(2, 0, 2),
(3, 0, 3);

/* Select */
SELECT DISTINCT u.user_id, u.name, u.email
FROM Users as u
WHERE u.email = 'john@example.com'
AND u.password = 'password123';


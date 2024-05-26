const host = "http://localhost:4000";
const activity_id = 44;
var token = "";

async function signin() {
    const apiUrl = `${host}/user/signin`;
    const data = {
        "email": "b09611028@ntu.edu.tw",
        "password": "pwd"
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    await fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            token = data.jwtToken;
            console.log("HERRREE", token);
        })
        .catch(error => {
            console.error

                ('Error:', error);
        });
};


async function createActivity() {
    console.log("token is", token);

    const apiUrl = `${host}/activity`;
    const data = {
        "name": "JAVASCRIPT TEST Activity",
        "introduction": "Introduction of Activity",
        "date": ["2024/04/27 16:0", "2024/04/28 16:0"],
        "need_reviewed": true,
        "country": "Taiwan",
        "max_participants": 10,
        "location": "Taipei",
        "application_problem": "Are you happy?",
        "is_one_time": false,
        "type": "study",
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "authorization": `bearer ${token}`,

        },
        body: JSON.stringify(data),
    };

    await fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                console.log(response.status);

                throw new Error('response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var data = JSON.stringify(data, null, 2);
            console.log(data);
        })
        .catch(error => {
            console.error

                ('Error:', error);
        });
}

async function test() {
    await signin();
    await createActivity();
}

test();
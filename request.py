import requests
import json

host = "http://localhost:4000"
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTcxNDI5MzkwNCwiZXhwIjoxNzE0Mjk3NTA0fQ.c0wsSQ6ZAQ6srdh54DDjEUpKH63fDkqNQv7qyftX4Kk"


def signup():
    payload = json.dumps(
        {
            "name": "daniel",
            "email": "daniel.bb0321@gmail.com",
            "password": "pwd",
        }
    )

    res = requests.post(
        url=f'{host}/user/signup',
        headers={"content-type": "application/json", },
        data=payload,
    )

    print(res.text)
    print(res.status_code)


def signin():
    res = requests.get(
        url=f'{host}/user/signin/?email=daniel.bb0321@gmail.com&password=pwd',
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}"
        },)

    print(res.text)
    print(res.status_code)


def create_activity():
    payload = json.dumps(
        {
            "name": "example Activity",
            "introduction": "Introduction of Activity",
            "date": "2024-04-27T11:56:53.727Z",
            "need_review": True,
            "country": "Taiwan",
            "max_participants": 10,
            "location": "Taipei",
            "application_problem": "Are you happy?"
        }
    )

    res = requests.post(
        url=f"{host}/activity",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}"
        },
        data=payload,
    )

    print(res.text)
    print(res.status_code)


def get_acitvity_list():
    res = requests.get(
        url=f"{host}/activity/?limit=5&search=example&country=Taiwan&location=Taipei&mode=owned",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}"
        },)

    print(res.text)
    print(res.status_code)


def get_acitvity_detail():
    res = requests.get(
        url=f"{host}/activity/2",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}"
        },)

    print(res.text)
    print(res.status_code)


def update_activity():
    payload = json.dumps(
        {
            "name": "cool Activity",
            "introduction": "updated Introduction of Activity",
            "date": "2024-04-27T06:26:48.578Z",
            "need_review": True,
            "county": "Taiwan",
            "application_problem": "enjoy!"
        }
    )
    res = requests.patch(
        url=f"{host}/activity/2",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}"
        },        data=payload,
    )

    print(res.text)
    print(res.status_code)


def delete_activity():
    res = requests.patch(
        url=f"{host}/activity/3",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}"
        },)

    print(res.text)
    print(res.status_code)


def apply():
    payload = json.dumps(
        {
            "application_response": "I want to join please!"
        }
    )
    res = requests.post(
        url=f"{host}/activity/3/apply",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}"
        },
        data=payload,
    )

    print(res.text)
    print(res.status_code)


def approve():

    res = requests.patch(
        url=f"{host}/application/1/approve",
        headers={"content-type": "application/json", },
        data=json.dumps({})
    )

    print(res.text)
    print(res.status_code)


def remove_user():
    payload = json.dumps(
        {
            "user_id": [1]
        }
    )
    res = requests.patch(
        url=f"{host}/activity/2/remove-user",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}"
        },        data=payload,
    )

    print(res.text)
    print(res.status_code)


def get_application_detail():
    res = requests.get(
        url=f"{host}/application/2",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}"
        },)

    print(res.text)
    print(res.status_code)


def make_discussion():
    payload = json.dumps(
        {
            "content": "I love you",
        }
    )
    res = requests.post(
        url=f"{host}/activity/2/discussion",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}"
        },        data=payload,
    )

    print(res.text)
    print(res.status_code)


def get_disccussion():

    res = requests.get(
        url=f"{host}/activity/2/discussion?limit=5&offset=0",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}"
        },)

    print(res.text)
    print(res.status_code)


if __name__ == '__main__':

    user_id = 1

    # signin()
    # create_activity()
    # get_acitvity_list()
    # get_acitvity_detail()
    # update_activity()
    # delete_activity()
    apply()
    # approve()
    # make_discussion()
    # get_disccussion()
    # get_application_detail()
    # remove_user()

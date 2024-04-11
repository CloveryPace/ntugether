import requests
import json


def send_application():
    payload = json.dumps({
        "activity_id": 1,
        "application_response": "hello",
    })

    res = requests.post(
        url="http://localhost:4000/application/apply",
        headers={"content-type": "application/json", },
        data=payload,
    )

    print(res.text)
    print(res.status_code)


def verify_application():
    payload = json.dumps({
        "application_id": 3,
    })

    res = requests.post(
        url="http://localhost:4000/application/verify",
        headers={"content-type": "application/json", },
        data=payload,
    )

    print(res.text)
    print(res.status_code)


def create_one_time():
    payload = json.dumps({
        "name": "Say hello to your mom",
        "introduction": "you should always say hello to our mom!",
        "date": "2021-03-21",
        "location": "your place",
        "max_participants": 10,
        "need_reviewed": False,
        "application_problem": "hello?",
        "check_by_organizer": True,
    })

    res = requests.post(
        url="http://localhost:4000/activity/create-one-time",
        headers={"content-type": "application/json", },
        data=payload,
    )

    print(res.text)
    print(res.status_code)


def get_info():
    payload = json.dumps({
        "activity_id": 3,
    })
    res = requests.post(
        url="http://localhost:4000/activity/info",
        headers={"content-type": "application/json", },
        data=payload
    )

    print(res.text)
    print(res.status_code)


def get_list_info():
    res = requests.get(
        url="http://localhost:4000/activity/get-list-infos",
        headers={"content-type": "application/json", },
    )

    print(res.text)
    print(res.status_code)


def edit_activity():  # FIXME: fail
    payload = json.dumps({
        "activity_id": "1",
        "name": "臉書上的爛活動",
        "introduction": "intro",
    })

    res = requests.patch(
        url="http://localhost:4000/activity/edit",
        headers={"content-type": "application/json", },
        data=payload
    )

    print(res.text)
    print(res.status_code)


edit_activity()

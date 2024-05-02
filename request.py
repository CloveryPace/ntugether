import requests
import json

host = "http://localhost:4000"


def signup():
    payload = json.dumps(
        {
            "name": "daniel",
            "email": "b09611028@ntu.edu.tw",
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
        url=f'{host}/user/signin/?email=b09611028@ntu.edu.tw&password=pwd',
        headers={
            "content-type": "application/json",
        },)

    print(res.text)
    print(res.status_code)

    return json.loads(res.text)["jwtToken"]


token = signin()


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


def create_plan():
    payload = json.dumps({
        "name": "Learning Plan",
        "goal": "Learn how to become a cow",
        "introduction": "Let's do it!",
        "progression": {
            "english": 10,
            "chinese": 5,
        },
        "start_date": "2024-03-21",
        "end_date": "2024-09-07",
        "application_problem": "hello?",
        "tags": ["Learning"],
        "invitees": [1, 2, 5],
        "need_review": True,
    })

    res = requests.post(
        url=f"{host}/plan",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}",
        },
        data=payload,
    )

    print(res.text)
    print(res.status_code)


def update_plan():
    payload = json.dumps({
        "name": "Not Cool Plan",
        "goal": "fall in love with a cow",
        "introduction": "I hate cow...",
        "progression": {
            "english": 10,
            "chinese": 5,
        },
        "start_date": "2024-03-21",
        "end_date": "2024-09-07",
        "tags": ["Exam"],
        "invitees": [7],
        # "removed_participants": [],
        "need_review": False,
    })

    res = requests.patch(
        url=f"{host}/plan/31",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}",
        },
        data=payload,
    )

    print(res.text)
    print(res.status_code)


def delete_plan():
    res = requests.delete(
        url=f"{host}/plan/30",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}",
        },
    )

    print(res.text)
    print(res.status_code)


def get_plan_detail():
    res = requests.get(
        url=f"{host}/plan/29",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}",
        },
    )

    print(res.text)
    print(res.status_code)


def get_plan_list():
    res = requests.get(
        url=f"{host}/plan?limit=30&search=Cool&mode=owned",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}",
        },
    )

    print(res.text)
    print(res.status_code)


def apply_plan():
    payload = json.dumps(
        {
            "application_response": "I love cow, too"
        }
    )
    res = requests.post(
        url=f"{host}/plan/29/apply",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}"
        },
        data=payload,
    )

    print(res.text)
    print(res.status_code)


def approve_plan():

    res = requests.patch(
        url=f"{host}/plan/application/2/approve",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}",
        },
        data=json.dumps({})
    )

    print(res.text)
    print(res.status_code)


def get_plan_application():
    res = requests.get(
        url=f"{host}/plan/application/2",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}"
        },)

    print(res.text)
    print(res.status_code)


def get_all_application():
    res = requests.get(
        url=f"{host}/plan/29/applications",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}"
        },)

    print(res.text)
    print(res.status_code)


def make_plan_discussion():
    payload = json.dumps(
        {
            "content": "I love cow soooo much!",
        }
    )
    res = requests.post(
        url=f"{host}/plan/29/discussion",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}"
        },        data=payload,
    )

    print(res.text)
    print(res.status_code)


def get_plan_discussion():

    res = requests.get(
        url=f"{host}/plan/29/discussion?limit=5&offset=0",
        headers={
            "content-type": "application/json",
        })

    print(res.text)
    print(res.status_code)


def respond_to_invitation():

    payload = json.dumps(
        {
            "accepted": True
        }
    )
    res = requests.post(
        url=f"{host}/plan/29/invitation",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}"
        },
        data=payload,
    )

    print(res.text)
    print(res.status_code)


if __name__ == '__main__':

    # signup()
    # create_activity()
    # get_acitvity_list()
    # get_acitvity_detail()
    # update_activity()
    # delete_activity()
    # apply()
    # approve()
    # make_discussion()
    # get_disccussion()
    # get_application_detail()
    # remove_user()

    # create_plan()
    # update_plan()
    # delete_plan()
    # get_plan_detail()
    # get_plan_list()
    # apply_plan()
    # approve_plan()
    # get_plan_application()
    # get_all_application()
    # make_plan_discussion()
    # get_plan_discussion()
    respond_to_invitation()

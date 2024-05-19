import requests
import json

# host = "http://ntugether.zapto.org:4000"
host = "http://localhost:4000"
activity_id = 39


def api_test(func):
    def wrapper():
        res: requests.Response = func()
        print(res.status_code)
        print(res.text)

        with open("result.json", "w") as f:
            json.dump(json.loads(res.text), f, ensure_ascii=False, indent=2)

    return wrapper


@api_test
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

    return res


def signin():
    payload = json.dumps({
        "email": "daniel.bb0321@gmail.com",
        # "email": "b09611028@ntu.edu.tw",
        # "email": "r12725066@ntu.edu.tw",
        "password": "pwd"
        # "password": "a"
    })
    res = requests.post(
        url=f'{host}/user/signin',
        headers={
            "content-type": "application/json",
        },
        data=payload,
    )

    try:
        return json.loads(res.text)["jwtToken"]
    except Exception as e:
        print("cannot sign in")


# signup()
token = signin()


""" API """


@api_test
def create_activity():
    payload = json.dumps(
        {
            "name": "Example Activity",
            "introduction": "Introduction of Activity",
            "date": ["2024-04-27T11:56:53.727Z", "2024-04-30"],
            "need_reviewed": True,
            "country": "Taiwan",
            "max_participants": 10,
            "location": "Taipei",
            "application_problem": "Are you happy?",
            "is_one_time": False,
            "type": "study",
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

    return res


@api_test
def get_acitvity_list():
    res = requests.get(
        url=f"{host}/activity/?limit=50&search=example&country=Taiwan&location=Taipei&mode=all",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}"
        },)

    return res


@api_test
def get_acitvity_detail():
    res = requests.get(
        url=f"{host}/activity/{activity_id}",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}"
        },)

    return res


@api_test
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
        url=f"{host}/activity/9",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}"
        },        data=payload,
    )

    return res


@api_test
def delete_activity():
    res = requests.patch(
        url=f"{host}/activity/12",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}"
        },)

    return res


@api_test
def apply():
    payload = json.dumps(
        {
            "application_response": "I want to join please!"
        }
    )
    res = requests.post(
        url=f"{host}/activity/{activity_id}/apply",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}"
        },
        data=payload,
    )

    return res


@api_test
def approve():

    res = requests.patch(
        url=f"{host}/application/7/approve",
        headers={"content-type": "application/json",
                 "authorization": f"bearer {token}"},
        data=json.dumps({})
    )

    return res


@api_test
def remove_user():
    payload = json.dumps(
        {
            "user_id": [1]
        }
    )
    res = requests.patch(
        url=f"{host}/activity/10/remove-user",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}"
        },
        data=payload,
    )

    return res


@api_test
def get_activity_applications():
    res = requests.get(
        url=f"{host}/activity/{activity_id}/application",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}"
        },
    )

    return res


@api_test
def get_application_detail():
    res = requests.get(
        url=f"{host}/application/2",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}"
        },)

    return res


@api_test
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

    return res


@api_test
def get_disccussion():

    res = requests.get(
        url=f"{host}/activity/2/discussion?limit=5&offset=0",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}"
        },)

    return res


@api_test
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

    return res


@api_test
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
        "invitees": [3],
        # "removed_participants": [],
        "need_review": False,
    })

    res = requests.patch(
        url=f"{host}/plan/1",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}",
        },
        data=payload,
    )

    return res


@api_test
def delete_plan():
    res = requests.delete(
        url=f"{host}/plan/2",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}",
        },
    )

    return res


@api_test
def get_plan_detail():
    res = requests.get(
        url=f"{host}/plan/29",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}",
        },
    )

    return res


@api_test
def get_plan_list():
    res = requests.get(
        url=f"{host}/plan?limit=30&search=Cool&mode=owned",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}",
        },
    )

    return res


@api_test
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

    return res


@api_test
def approve_plan():

    res = requests.patch(
        url=f"{host}/plan/application/2/approve",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}",
        },
        data=json.dumps({})
    )

    return res


@api_test
def get_plan_application():
    res = requests.get(
        url=f"{host}/plan/application/2",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}"
        },)

    return res


@api_test
def get_plan_applications():
    res = requests.get(
        url=f"{host}/plan/29/applications",
        headers={
            "content-type": "application/json",
            "authorization": f"bearer {token}"
        },)

    return res


@api_test
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

    return res


@api_test
def get_plan_discussion():

    res = requests.get(
        url=f"{host}/plan/29/discussion?limit=5&offset=0",
        headers={
            "content-type": "application/json",
        })

    return res


@api_test
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

    return res


if __name__ == '__main__':

    # signup()
    # create_activity()
    # get_acitvity_list()
    # get_acitvity_detail()
    # update_activity()
    # delete_activity()
    # apply()
    # get_activity_applications()
    # approve()
    # make_discussion()
    # get_disccussion()
    # get_application_detail()
    # remove_user()

    # create_plan()
    # update_plan()
    # delete_plan()
    get_plan_detail()
    # get_plan_list()
    # apply_plan()
    # approve_plan()
    # get_plan_application()
    # get_plan_applications()
    # make_plan_discussion()
    # get_plan_discussion()
    # respond_to_invitation()

    pass

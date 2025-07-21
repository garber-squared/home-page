---
layout: post
title:  "Parametrized Unit Test for Panda CSV DataFrame with Tuple Keys"
date:   "Tue Apr 23 04:26:32 AM EDT 2024"
tags: [panda,python,csv,ttd]
---
CSV

```csv
name,email,year,month,day
Test,test@email.com,1961,12,21
Foo Bar,foo@bar.com,1990,01,31
```

Source code

```python
class Emailer:
    def __init__(self):
        sys.path.append(os.path.join(os.path.dirname(__file__), ".."))
        load_dotenv(find_dotenv())
        self.email = os.getenv("MY_EMAIL")
        self.password = os.getenv("MY_PASSWORD")
        self.birthdays = self.get_birthdays()

    def get_birthdays(self):
        path = "src/days_of_code/assets/csv/birthdays.csv"
        data = pandas.read_csv(path)
        birthdays_dict: dict[tuple[int, int], any] = {}
        for index, data_row in data.iterrows():
            key: tuple[int, int] = (data_row["month"], data_row["day"])
            birthdays_dict[key] = data_row
        return birthdays_dict
```

PyTest Case

```python
@pytest.fixture
def app():
    yield d.Emailer()

@pytest.mark.parametrize(
    "birthday_info",
    [
        (
            (12, 21),
            {
                "name": "Test",
                "email": "test@email.com",
                "year": 1961,
                "month": 12,
                "day": 21,
            },
        ),
        (
            (1, 31),
            {
                "name": "Foo Bar",
                "email": "foo@bar.com",
                "year": 1990,
                "month": 1,
                "day": 31,
            },
        ),
    ],
)
def test_birthdays(app, birthday_info):
    bday_tuple, expected = birthday_info
    assert app.birthdays[bday_tuple]["name"] == expected["name"]
    assert app.birthdays[bday_tuple]["email"] == expected["email"]
    assert app.birthdays[bday_tuple]["year"] == expected["year"]
    assert app.birthdays[bday_tuple]["month"] == expected["month"]
    assert app.birthdays[bday_tuple]["day"] == expected["day"]
```

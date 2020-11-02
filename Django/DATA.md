## FAKE DATA

>  샘플 생성

반자동?

seed_amenities 라는 명령어를 만든다 = commands 폴더에 seed_amenities .py 생성

```python
from django.core.management.base import BaseCommand
from rooms.models import Amenity


class Command(BaseCommand):

    help = "this commands tell me ..."

    def handle(self, *args, **options):
        amenities = [
            "Kitchen",
            "Heating",
            "Washer",
            "Wifi",
            "Indoor fireplace",
            "Iron",
            "Laptop friendly workspace",
            "Crib",
            "Self check-in",
            "Carbon monoxide detector",
            "Shampoo",
            "Air conditioning",
            "Dryer",
            "Breakfast",
            "Hangers",
            "Hair dryer",
            "TV",
            "High chair",
            "Smoke detector",
            "Private bathroom",
        ]
        for a in amenities:
            Amenity.objects.create(name=a)
        self.stdout.write(self.style.SUCCESS("Amenities created!"))
```

```shell
$ python manage.py seed_amenities
Amenities created!
```

정해준대로 생성된다!!!



#### 자동 = Django seed

설치

```shell
$ pipenv install django_seed
```

setting.py

```python
# 추가
THIRD_PARTY_APPS = ["django_countries", "django_seed"]
```

users/management/commands/seed_user.py

```python
from django.core.management.base import BaseCommand
# seed import
from django_seed import Seed
# user import
from users.models import User


class Command(BaseCommand):

    help = "this commands create many users"

    def add_arguments(self, parser):
        # 반복을 위한 argu를 추가해 준다. int 변환 필수
        parser.add_argument(
            "--number", default=2, type=int, help="How many users do you want?"
        )

    def handle(self, *args, **options):
        number = options.get("number", 1)
        seeder = Seed.seeder()
        # 자동 생성 샘플의 세팅하고 싶은 값을 지정해 준다 
        seeder.add_entity(User, number, {"is_staff": False, "is_superuser": False})
        # 실행!
        seeder.execute()
        self.stdout.write(self.style.SUCCESS(f"{number} users created!"))
```

shell

```shell
$ python manage.py seed_users --number 50
50 users created!
```

여기서 avator = 사진파일도 임의의 파일로 생성된다. (csv, html .등등)



rooms/management/commands/seed_rooms.py

```python
import random
from django.core.management.base import BaseCommand
from django.contrib.admin.utils import flatten
from django_seed import Seed
from rooms import models as room_models
from users import models as user_models

NAME = "rooms"

class Command(BaseCommand):

    help = f"this commands create many {NAME}"

    def add_arguments(self, parser):
        parser.add_argument(
            "--number", default=2, type=int, help="How many {NAME} do you want?"
        )

    def handle(self, *args, **options):
        number = options.get("number")
        seeder = Seed.seeder()
        all_users = user_models.User.objects.all()
        room_types = room_models.RoomType.objects.all()
        seeder.add_entity(
            room_models.Room,
            number,
            {
                "name": lambda x: seeder.faker.address(),
                # foreignkey 관계의 경우 다음과 같이 지정 할 수 있다.
                "host": lambda x: random.choice(all_users),
                "room_type": lambda x: random.choice(room_types),
                "price": lambda x: random.randint(1, 1000),
                "beds": lambda x: random.randint(1, 5),
                "bedrooms": lambda x: random.randint(1, 5),
                "bath": lambda x: random.randint(1, 5),
                "guests": lambda x: random.randint(1, 20),
            },
        )
        created_photo = seeder.execute()
        created_clean = flatten(list(created_photo.values()))
        amenities = room_models.Amenity.objects.all()
        facilities = room_models.Facility.objects.all()
        rule = room_models.HouseRule.objects.all()
        for pk in created_clean:
            room = room_models.Room.objects.get(pk=pk)
            # model을 바로 생성할 수도 있다.
            for i in range(3, random.randint(10, 30)):
                room_models.Photo.objects.create(
                    caption=seeder.faker.sentence(),
                    room=room,
                    file=f"room_photos/{random.randint(1,31)}.webp",
                )
            # manytomany 관계의 경우 다음과 같은 트릭을 쓸 수 있다.
            for a in amenities:
                magic_number = random.randint(0, 15)
                if magic_number % 2 == 0:
                    room.amenity.add(a)
            for f in facilities:
                magic_number = random.randint(0, 15)
                if magic_number % 2 == 0:
                    room.facility.add(f)
            for r in rule:
                magic_number = random.randint(0, 15)
                if magic_number % 2 == 0:
                    room.houserule.add(r)
        self.stdout.write(self.style.SUCCESS(f"{number} {NAME} created!"))

```


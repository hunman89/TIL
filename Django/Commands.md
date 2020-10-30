## Custom commands

> manage.py 의 명령어를 직접 custom 할 수 있다.

명령어를 만들고 Django seed를 통해 샘플을 자동으로 생성한다.

먼저 app에 management 폴더를 만들고 \__init__.py 를 생성한다.

다음 management 폴더에 commands폴더 만들고 \__init__.py 를 생성한다.

commands 폴더에 원하는 명령을 이름으로 하는 py 파일 생성

```python
from django.core.management.base import BaseCommand


class Command(BaseCommand):

    help = "this commands tell me"

    def add_arguments(self, parser):
        parser.add_argument("--times", help="How many times?")

    def handle(self, *args, **options):
        times = options.get("times")
        for t in range(0, int(times)):
            self.stdout.write(self.style.ERROR("I love you"))
```


## apply

class 너무 붙여넣지 말고 사용하자

style.css

```scss
@tailwind base;
@tailwind components;

.search-box {
  transition: box-shadow 0.5s linear;
}  
/* 여기에 지정하고 class를 적용해도 된다.*/

@tailwind utilities;
```

단, `npm run css`해야 적용된다.



#### scss 적용



````html
<ul class="flex items-center text-sm font-medium h-full">

    {% if user.is_authenticated %}
    <li class="ml-8"><a href="{% url "users:logout" %}">Log out</a></li>
    {% else %}
    <li class="ml-8 border-b-2 border-white hover:border-gray-600 h-full flex items-center"><a class="py-10 px-5" href="{% url "users:login" %}">Log in</a></li>
    <li class="ml-8 border-b-2 border-white hover:border-gray-600 h-full flex items-center"><a class="py-10 px-5" href="{% url "users:signup" %}">Sign up</a></li>
    {% endif %}


</ul>
````

위를 apply 적용하면.

assets/scss/styles.scss

```scss
.nav_link {
  @apply ml-8 border-b-2 border-white h-full flex items-center;
  a {
    @apply py-10 px-5;
  }
  &:hover {
    @apply border-gray-600; /*hover는 뺴줘야한다.*/
  }
}
```

```html
<ul class="flex items-center text-sm font-medium h-full">

    {% if user.is_authenticated %}
    <li class="nav_link"><a href="{% url "users:logout" %}">Log out</a></li>
    {% else %}
    <li class="nav_link"><a href="{% url "users:login" %}">Log in</a></li>
    <li class="nav_link"><a href="{% url "users:signup" %}">Sign up</a></li>
    {% endif %}

</ul>
```


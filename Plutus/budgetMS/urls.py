"""Plutus URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
from . import views


urlpatterns = [
    path('',views.home),
    path('login',views.login),
    path('expense',views.expense),
    path('income',views.income),
    path('about',views.about),
    path('contact', views.contact),
    path('signup', views.signup),
    path('actions', views.actions),
    path('budget', views.budget),
    path('status', views.status),
    path('exp_download', views.exp_download),
]
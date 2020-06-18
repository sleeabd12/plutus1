from django.db import models
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User

class expenses(models.Model):
    Dept = models.CharField(max_length=20)
    Name = models.CharField(max_length=255)
    Date = models.DateField()
    Amount = models.FloatField()
    created_on = models.DateTimeField(auto_now_add=True)

   

class incomes(models.Model):
    Type = models.CharField(max_length=20)
    Name = models.CharField(max_length=255)
    Date = models.DateField()
    Amount = models.FloatField()
    created_on = models.DateTimeField(auto_now_add=True)

class budget(models.Model):
    Current = models.CharField(max_length=20)
    Misc = models.IntegerField()
    Marketing = models.IntegerField()
    HR = models.IntegerField()
    Finance = models.IntegerField()
    created_on = models.DateTimeField(auto_now_add=True)


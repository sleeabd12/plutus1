from django.contrib import admin
from .models import expenses,incomes,budget

# Register your models here.
admin.site.register(expenses) 
admin.site.register(incomes) 
admin.site.register(budget) 
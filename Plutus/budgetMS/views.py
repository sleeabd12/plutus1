import required as required
from django.contrib import auth
from django.contrib.auth import authenticate, login as dj_login
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.urls import reverse
from.forms import expenseform,incomesform,budget
from django.db import models
from .models import expenses,incomes,budget
from django import forms
import xlwt
from django.http import HttpResponse
import csv,xlwt
from django.utils.encoding import smart_str


# from django.contrib.auth import authenticate, login as dj_login


def hello(request):
    return render( request, "Welcome to Plutus!" )

def logout(request):
    auth.logout(request)
    return render (request,'login.html')

def login(request):
    context = {}
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate( request, username=username, password=password )
        if user:
            dj_login( request, user )
            return HttpResponseRedirect( "actions" )
        else:
            context["error"] = "Provide valid credentials !!"
            return render( request, "login.html", context )
    else:
        return render( request, "login.html", context )

@login_required()
def expense(request):

    if request.method == 'POST' and request.POST:
        myform=expenseform(data=request.POST)
        print(myform)

        if myform.is_valid():
            myform.save(commit='true')
            myform.save()
        else:
            print("invalid form")
    return render( request, 'expense.html')



@login_required()
def income(request):

    if request.method == 'POST' and request.POST:
        myform1=incomesform(data=request.POST)
        print(myform1)

        if myform1.is_valid():
            myform1.save(commit='true')
            myform1.save()
        else:
            print("invalid form")
    return render( request, 'income.html' )


def home(request):
    return render( request, 'home.html' )


def about(request):
    return render( request, 'about.html' )


def contact(request):
    return render( request, 'contact.html' )


def signup(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']

        x = User.objects.create_user( username=username, email=email, password=password )
        x.save()
        print( "User Created" )
        return redirect( 'http://127.0.0.1:8000/login' )
    else:
        return render( request, 'signup.html' )

@login_required()
def actions(request):
    return render( request, 'actions.html' ) 

@login_required()
def budget(request):
    if request.method == 'POST' and request.POST:
        myform2=budgetsform(data=request.POST)
        print(myform2)

        if myform1.is_valid():
            myform2.save(commit='true')
            myform2.save()
        else:
            print("invalid form")
    return render( request, 'budget.html' )
    
def status(request):
    expData = expenses.objects.all()
    incData = incomes.objects.all()
    context = {'incomes': incData,'expenses': expData,}
    return render(request,'status.html', context)


def exp_download(request):
	# content-type of response
	response = HttpResponse(content_type='application/ms-excel')

	#decide file name
	response['Content-Disposition'] = 'attachment; filename="exp.xls"'

	#creating workbook
	wb = xlwt.Workbook(encoding='utf-8')

	#adding sheet
	ws = wb.add_sheet("sheet1")

	# Sheet header, first row
	row_num = 0

	font_style = xlwt.XFStyle()
	# headers are bold
	font_style.font.bold = True

	#column header names, you can use your own headers here
	columns = ['Dept', 'Name', 'Date', 'Amount', ]

	#write column headers in sheet
	for col_num in range(len(columns)):
		ws.write(row_num, col_num, columns[col_num], font_style)

	# Sheet body, remaining rows
	font_style = xlwt.XFStyle()

   # print(request)

	# #get your data, from database or from a text file...
	# data = get_data() #dummy method to fetch data.
	# for my_row in data:
	# 	row_num = row_num + 1
	# 	ws.write(row_num, 0, my_row.name, font_style)
	# 	ws.write(row_num, 1, my_row.start_date_time, font_style)
	# 	ws.write(row_num, 2, my_row.end_date_time, font_style)
	# 	ws.write(row_num, 3, my_row.notes, font_style)

	#wb.save(response)
	return HttpResponse("ok")

def test(request):
    incData = incomes.objects.all()
    context = {'incomes': incData,}
    render(request,'incomet.html', context)

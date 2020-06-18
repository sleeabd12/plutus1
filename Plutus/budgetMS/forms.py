from django import forms
from .models import expenses,incomes,budget


class expenseform(forms.ModelForm):
    class Meta:
        model = expenses
        fields = [
            'Dept',
            'Name',
            'Date',
            'Amount',
        ]


class incomesform(forms.ModelForm):
    class Meta:
        model = incomes
        fields = [
            'Type',
            'Name',
            'Date',
            'Amount',
        ]

class budgetsform(forms.ModelForm):
    class Meta:
        model = budget
        fields = [
            'Current',
            'Misc',
            'Marketing',
            'HR',
            'Finance',
        ]
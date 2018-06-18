from django.shortcuts import render, redirect
from django.http import HttpResponseNotFound
from .forms import LoginForm, AddStockForm
from .models import Stock
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
import requests

# Create your views here.
def home(request):
    if request.user.is_authenticated:
        return redirect('all_stocks')
    return render(request, 'home')

def login_user(request):
    if request.method == 'POST':
        username = request.POST['username']
        raw_password = request.POST['password']
        user = authenticate(username=username, password=raw_password)
        login(request, user)
        return redirect('all_stocks')
    else:
        form = LoginForm()
    return render(request, 'login_user', {'form': form})

def signup_user(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'signup_user', {'form': form})

def logout_user(request):
    logout(request)
    return redirect('home')

@login_required
def all_stocks(request):
    if request.method == 'POST':
        stock = request.POST['stock']
        try:
            db_stock = Stock.objects.get(symbol=stock)
        except Exception as e:
            r = requests.get('https://api.iextrading.com/1.0/stock/' + stock + '/company')
            if r.status_code == 200:
                db_stock = Stock.objects.create(symbol=stock)
            else:
                return redirect('all_stocks')
        db_stock.users.add(request.user)
        return redirect('all_stocks')
    stocks = request.user.stock_set.all()
    form = AddStockForm()
    return render(request, 'all_stocks', {'stocks': stocks, 'form': form})

def add_stock(request):
    if request.method == 'POST':
        stock = request.POST['stock']
        try:
            db_stock = Stock.objects.get(symbol=stock)
        except Exception as e:
            db_stock = Stock.objects.create(symbol=stock)
        db_stock.users.add(request.user)
        return redirect('all_stocks')
    else:
        form = AddStockForm()
    return render(request, 'add_stock', {'form': form})

def about(request):
    return render(request, 'about')

@login_required
def stock_delete(request, symbol):
    stock = Stock.objects.get(symbol=symbol)
    stock.users.remove(request.user)
    return redirect('all_stocks')

from django.urls import path
from . import views
from django.contrib.auth.views import logout

urlpatterns = [
    # if we go to '/', go to the views, run the artist_list function.
    # third argument is naming this path.

    path('', views.home, name='home'),
    path('login/', views.login_user, name='login_user'),
    path('signup/', views.signup_user, name='signup_user'),
    path('logout_user', logout, name='logout_user'),
    path('list/', views.all_stocks, name='all_stocks'),
    path('add/', views.add_stock, name='add_stock'),
    path('about/', views.about, name='about'),
    path('delete/<slug:symbol>', views.stock_delete, name='stock_delete'),
]

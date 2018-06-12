from django.urls import path
from . import views

urlpatterns = [
    # if we go to '/', go to the views, run the artist_list function.
    # third argument is naming this path.

    path('', views.home, name='home'),
    path('login/', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('logout_user', views.logout_user, name='logout_user'),

]

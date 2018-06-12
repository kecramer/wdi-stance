from django.urls import path
from . import views

urlpatterns = [
    # if we go to '/', go to the views, run the artist_list function.
    # third argument is naming this path.

    path('', views.home, name='home'),

]

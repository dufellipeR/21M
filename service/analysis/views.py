from rest_framework import generics
from rest_framework.response import Response
from django.shortcuts import render
import requests


# The score should be updated once a day

#Build a should BUY SCORE/ Edward Score like: 

# Fear & Greed index < 30 Add 5 to score
# Fear & Greed index < 20 Add 10 to score
# Fear & Greed index < 10 Add 15 to score

# Mayer Multiple Index < 2 Add 5 to score
# Mayer Multiple Index < 1 Add 10 to score
# Mayer Multiple Index < 0.50 Add 15 to score

# Relative strength index < 60 Add 5 to score
# Relative strength index < 50 Add 10 to score
# Relative strength index < 40 Add 15 to score

class Analysis(generics.ListAPIView):
    
    def list( self, request):
        r = requests.get('https://api.alternative.me/fng/')
        print(r.status_code)
        print(r.json()['data']['value'])
        return Response(r.json())
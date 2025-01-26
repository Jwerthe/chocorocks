from django import forms
from django.db import connection 
from .models import Product, Post
from django.core.exceptions import ValidationError

class ProductForm(forms.ModelForm):
    class Meta: 
        model = Product
        fields = '__all__'
        widgets = {
            'name':forms.TextInput(attrs={'class': 'form-control'}),
            'description':forms.Textarea(attrs={'class': 'form-control'}),
            'complete_description':forms.Textarea(attrs={'class': 'form-control'}),
            'price':forms.NumberInput(attrs={'class': 'form-control'}),
            'available':forms.Select(attrs={'class': 'form-control-file'}),
        }
        labels = {
            'name': 'Nombre del Producto',
            'description': 'Descripción',
            'complete_description': 'Descripción detallada',
            'price': 'Precio',
            'image': 'Imagen del Producto',
            'available': 'Disponibilidad',
        }


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = '__all__'
        widgets = {
            'title':forms.TextInput(attrs={'class': 'form-control'}),
            'description':forms.Textarea(attrs={'class': 'form-control'}),
        }
        labels = {
            'title': 'Título',
            'description': 'Descripción',
        }

class CheckoutForm(forms.Form):
    name = forms.CharField(
        max_length=100,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Nombre completo'
        })
    )
    phone = forms.CharField(
        max_length=15,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Número de teléfono'
        })
    )
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={
            'class': 'form-control',
            'placeholder': 'Correo electrónico'
        })
    )
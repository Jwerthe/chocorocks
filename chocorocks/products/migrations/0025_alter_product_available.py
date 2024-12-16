# Generated by Django 4.2 on 2024-12-16 21:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0024_post_alter_product_available'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='available',
            field=models.CharField(choices=[('Not Available', 'No Disponible'), ('Available', 'Disponible'), ('Soon', 'Proximamente')], max_length=20),
        ),
    ]

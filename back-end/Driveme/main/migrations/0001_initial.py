# Generated by Django 4.1.2 on 2023-09-06 08:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('username', models.CharField(max_length=120, unique=True)),
                ('password', models.CharField(max_length=120)),
                ('email', models.EmailField(max_length=254)),
                ('full_name', models.CharField(max_length=200)),
                ('date_of_birth', models.DateField(blank=True, null=True)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='profiles')),
                ('registered_since', models.DateField(auto_now=True, null=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('is_superuser', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
            ],
            options={
                'verbose_name': 'Username',
                'verbose_name_plural': 'Usernames',
            },
        ),
        migrations.CreateModel(
            name='Car',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=200)),
                ('image', models.ImageField(upload_to='cars')),
                ('short_desc', models.CharField(max_length=250)),
                ('engine', models.IntegerField(default=None)),
                ('speed', models.IntegerField(default=None)),
                ('time_to_100', models.FloatField(default=None)),
                ('weight', models.FloatField(default=None)),
                ('car_range', models.IntegerField(default=None)),
                ('price_per_day', models.IntegerField(default=None)),
                ('shop_rating', models.FloatField(default=None)),
                ('slug', models.SlugField(max_length=120)),
            ],
            options={
                'verbose_name': 'Car',
                'verbose_name_plural': 'Cars',
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('slug', models.SlugField(max_length=120)),
            ],
            options={
                'verbose_name': 'Category',
                'verbose_name_plural': 'Categories',
            },
        ),
        migrations.CreateModel(
            name='Color',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('slug', models.SlugField(max_length=120)),
            ],
            options={
                'verbose_name': 'Color',
                'verbose_name_plural': 'Colors',
            },
        ),
        migrations.CreateModel(
            name='Drive_train',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('slug', models.SlugField(max_length=120)),
            ],
            options={
                'verbose_name': 'Drive Train',
                'verbose_name_plural': 'Drive Train',
            },
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.CharField(max_length=20)),
                ('valid', models.CharField(max_length=5)),
                ('cvv', models.IntegerField()),
            ],
            options={
                'verbose_name': 'Payment Detail',
                'verbose_name_plural': 'Payment Details',
            },
        ),
        migrations.CreateModel(
            name='PaymentSys',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=15)),
                ('slug', models.SlugField(max_length=20)),
            ],
            options={
                'verbose_name': 'Payment System',
                'verbose_name_plural': 'Payment Systems',
            },
        ),
        migrations.CreateModel(
            name='Transmission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('slug', models.SlugField(max_length=120)),
            ],
            options={
                'verbose_name': 'Transmission',
                'verbose_name_plural': 'Transmission',
            },
        ),
        migrations.CreateModel(
            name='Rented_Car',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city', models.CharField(default=None, max_length=120)),
                ('street', models.CharField(default=None, max_length=120)),
                ('days', models.IntegerField()),
                ('total', models.IntegerField(default=None)),
                ('car', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='main.car')),
                ('payment_details', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.PROTECT, to='main.payment')),
                ('username', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Rented Car',
                'verbose_name_plural': 'Rented Cars',
            },
        ),
        migrations.AddField(
            model_name='payment',
            name='payment_sys',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='main.paymentsys'),
        ),
        migrations.AddField(
            model_name='car',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='main.category'),
        ),
        migrations.AddField(
            model_name='car',
            name='color',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='main.color'),
        ),
        migrations.AddField(
            model_name='car',
            name='drive_train',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='main.drive_train'),
        ),
        migrations.AddField(
            model_name='car',
            name='transmission',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='main.transmission'),
        ),
        migrations.AddField(
            model_name='user',
            name='payment_details',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.payment'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions'),
        ),
    ]

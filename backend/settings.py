
from pathlib import Path
from datetime import timedelta


BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-!timu8t*nk(k5b95cz7q!x(@cswjc4rf)%+tl-i(z#v1g+fgnm'


DEBUG = True

ALLOWED_HOSTS = []


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
      
    'corsheaders',
    'rest_framework', #DRF
    'api.apps.ApiConfig', #app
    #аутентификация pip install djoser djangorestframework-simplejwt
    'rest_framework.authtoken',  
    'djoser',
    'django.contrib.sites',  #пароля по email
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    
    'whitenoise.middleware.WhiteNoiseMiddleware',  # ← обязательно 
    
    'django.contrib.sessions.middleware.SessionMiddleware',
    
    'corsheaders.middleware.CorsMiddleware',#server для django react перед CommonMiddleware
    
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / "templates"],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True



STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# ------------------------------------

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / "dist",
    BASE_DIR / "public",
   
]

STATIC_ROOT = BASE_DIR / "static"

# ------------------------------------

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# -----------------------------------------------


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'



INTERNAL_IPS = [
    'localhost',
    '127.0.0.1',
]
###################

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOWED_ORIGINS = [
    
    # после обновления обязательно npm run build  и потом python manage.py collectstatic
    # "https://jenyatarasenko.pythonanywhere.com",# React
    
    
    # 'http://localhost:5173',
    'http://127.0.0.1:8001',

]


######################################
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
######################################

###################Регистрация аунтификация###################

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

# from datetime import timedelta
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'AUTH_HEADER_TYPES': ('JWT',),
}
###################Регистрация аунтификация###################

SITE_ID = 1
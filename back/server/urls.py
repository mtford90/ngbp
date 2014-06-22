from django.conf.urls import patterns, url, include
from rest_framework.routers import DefaultRouter

from server import views


router = DefaultRouter()
router.register(r'breakdowns', views.BreakdownViewSet)
router.register(r'snapshots', views.SnapshotViewSet)

urlpatterns = patterns('server.views',
                       url(r'^', include(router.urls)),
)
import random

from rest_framework.reverse import reverse
from rest_framework.status import is_success

from rest_framework.test import APITransactionTestCase

from server.models import Snapshot, Breakdown


class TestSnapshots(APITransactionTestCase):
    def test_get(self):
        for _ in range(0, 10):
            MockSuite().mock_snapshot()
        response = self.client.get(reverse('snapshot-list'))
        self.assertTrue(is_success(response.status_code))
        self.assertEqual(10, response.data['count'])


class MockSuite(object):
    urls = ['http://www.google.com/',
            'http://www.mosayc.com',
            'http://www.mtford.co.uk']

    def __init__(self):
        super().__init__()

    def mock_snapshot(self):
        return Snapshot.objects.create(
            url=random.choice(self.urls),
            start=float(random.randint(0, 10)),
            end=float(random.randint(11, 100))
        )

    def mock_breakdown(self, num_snapshots=None):
        if not num_snapshots:
            num_snapshots = random.randint(3, 5)
        snapshots = [self.mock_snapshot() for _ in range(0, num_snapshots)]
        return Breakdown(snapshots=snapshots)
import unittest
from src.data_processing import sum
import mock_data

class TestDataProcessing(unittest.TestCase):

    def test_sum(self):
        print('Sum two numbers')
        expected_value = 30
        values = sum(mock_data.NUM1, mock_data.NUM2)

        assert values == expected_value

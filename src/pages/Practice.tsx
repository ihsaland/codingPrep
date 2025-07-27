import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Target, Clock, TrendingUp, Code, CheckCircle } from 'lucide-react';

const Practice: React.FC = () => {
  const [selectedProblem, setSelectedProblem] = useState('two-sum');

  const problems = [
    {
      id: 'two-sum',
      title: 'Two Sum',
      difficulty: 'Easy',
      category: 'Arrays',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      example: {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      solution: `def two_sum(nums, target):
    """Two Sum solution using hash table"""
    seen = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    
    return []  # No solution found

# Example usage
nums = [2, 7, 11, 15]
target = 9
result = two_sum(nums, target)
print(f"Input: nums = {nums}, target = {target}")
print(f"Output: {result}")`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    },
    {
      id: 'valid-parentheses',
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      category: 'Stack',
      description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
      example: {
        input: 's = "()[]{}"',
        output: 'true',
        explanation: 'The string contains valid parentheses pairs.'
      },
      solution: `def is_valid(s):
    """Valid Parentheses solution using stack"""
    stack = []
    brackets = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in '({[':
            stack.append(char)
        elif char in ')}]':
            if not stack or stack.pop() != brackets[char]:
                return False
    
    return len(stack) == 0

# Example usage
s = "()[]{}"
result = is_valid(s)
print(f"Input: s = '{s}'")
print(f"Output: {result}")`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    },
    {
      id: 'reverse-linked-list',
      title: 'Reverse Linked List',
      difficulty: 'Easy',
      category: 'Linked List',
      description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
      example: {
        input: 'head = [1,2,3,4,5]',
        output: '[5,4,3,2,1]',
        explanation: 'The linked list is reversed in place.'
      },
      solution: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    """Reverse Linked List solution using iterative approach"""
    prev = None
    current = head
    
    while current:
        next_temp = current.next
        current.next = prev
        prev = current
        current = next_temp
    
    return prev

# Example usage
# Create linked list: 1 -> 2 -> 3 -> 4 -> 5
head = ListNode(1)
head.next = ListNode(2)
head.next.next = ListNode(3)
head.next.next.next = ListNode(4)
head.next.next.next.next = ListNode(5)

reversed_head = reverse_list(head)
print("Reversed linked list:")
current = reversed_head
while current:
    print(current.val, end=" -> " if current.next else "")
    current = current.next`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 'binary-search',
      title: 'Binary Search',
      difficulty: 'Easy',
      category: 'Search',
      description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums.',
      example: {
        input: 'nums = [-1,0,3,5,9,12], target = 9',
        output: '4',
        explanation: '9 exists in nums and its index is 4.'
      },
      solution: `def search(nums, target):
    """Binary Search implementation"""
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

# Example usage
nums = [-1, 0, 3, 5, 9, 12]
target = 9
result = search(nums, target)
print(f"Input: nums = {nums}, target = {target}")
print(f"Output: {result}")`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 'maximum-subarray',
      title: 'Maximum Subarray',
      difficulty: 'Medium',
      category: 'Dynamic Programming',
      description: 'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
      example: {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: 'The subarray [4,-1,2,1] has the largest sum 6.'
      },
      solution: `def max_sub_array(nums):
    """Maximum Subarray using Kadane's algorithm"""
    max_sum = current_sum = nums[0]
    
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    
    return max_sum

# Example usage
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
result = max_sub_array(nums)
print(f"Input: nums = {nums}")
print(f"Output: {result}")`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 'palindrome-number',
      title: 'Palindrome Number',
      difficulty: 'Easy',
      category: 'Math',
      description: 'Given an integer x, return true if x is a palindrome, and false otherwise.',
      example: {
        input: 'x = 121',
        output: 'true',
        explanation: '121 reads as 121 from left to right and from right to left.'
      },
      solution: `def is_palindrome(x):
    """Palindrome Number solution"""
    # Negative numbers are not palindromes
    if x < 0:
        return False
    
    # Convert to string and check
    return str(x) == str(x)[::-1]

# Alternative solution without string conversion
def is_palindrome_math(x):
    """Palindrome Number solution using math"""
    if x < 0:
        return False
    
    original = x
    reversed_num = 0
    
    while x > 0:
        digit = x % 10
        reversed_num = reversed_num * 10 + digit
        x //= 10
    
    return original == reversed_num

# Example usage
x = 121
result = is_palindrome(x)
print(f"Input: x = {x}")
print(f"Output: {result}")`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 'remove-duplicates',
      title: 'Remove Duplicates from Sorted Array',
      difficulty: 'Easy',
      category: 'Arrays',
      description: 'Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once.',
      example: {
        input: 'nums = [1,1,2]',
        output: '2, nums = [1,2,_]',
        explanation: 'Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.'
      },
      solution: `def remove_duplicates(nums):
    """Remove Duplicates from Sorted Array"""
    if not nums:
        return 0
    
    k = 1  # Position for next unique element
    
    for i in range(1, len(nums)):
        if nums[i] != nums[i-1]:
            nums[k] = nums[i]
            k += 1
    
    return k

# Example usage
nums = [1, 1, 2]
result = remove_duplicates(nums)
print(f"Input: nums = [1, 1, 2]")
print(f"Output: {result}, nums = {nums[:result]}")`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 'climbing-stairs',
      title: 'Climbing Stairs',
      difficulty: 'Easy',
      category: 'Dynamic Programming',
      description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
      example: {
        input: 'n = 3',
        output: '3',
        explanation: 'There are three ways to climb to the top: 1 + 1 + 1, 1 + 2, 2 + 1.'
      },
      solution: `def climb_stairs(n):
    """Climbing Stairs using dynamic programming"""
    if n <= 2:
        return n
    
    # dp[i] represents ways to climb i stairs
    dp = [0] * (n + 1)
    dp[1] = 1
    dp[2] = 2
    
    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]

# Space-optimized solution
def climb_stairs_optimized(n):
    """Climbing Stairs with O(1) space"""
    if n <= 2:
        return n
    
    prev, curr = 1, 2
    for i in range(3, n + 1):
        prev, curr = curr, prev + curr
    
    return curr

# Example usage
n = 3
result = climb_stairs(n)
print(f"Input: n = {n}")
print(f"Output: {result}")`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 'merge-sorted-array',
      title: 'Merge Sorted Array',
      difficulty: 'Easy',
      category: 'Arrays',
      description: 'You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.',
      example: {
        input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3',
        output: '[1,2,2,3,5,6]',
        explanation: 'The arrays we are merging are [1,2,3] and [2,5,6].'
      },
      solution: `def merge(nums1, m, nums2, n):
    """Merge Sorted Array solution"""
    # Start from the end of nums1
    p1 = m - 1
    p2 = n - 1
    p = m + n - 1
    
    while p1 >= 0 and p2 >= 0:
        if nums1[p1] > nums2[p2]:
            nums1[p] = nums1[p1]
            p1 -= 1
        else:
            nums1[p] = nums2[p2]
            p2 -= 1
        p -= 1
    
    # Copy remaining elements from nums2
    while p2 >= 0:
        nums1[p] = nums2[p2]
        p2 -= 1
        p -= 1

# Example usage
nums1 = [1, 2, 3, 0, 0, 0]
m = 3
nums2 = [2, 5, 6]
n = 3

merge(nums1, m, nums2, n)
print(f"Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3")
print(f"Output: {nums1}")`,
      timeComplexity: 'O(m + n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 'symmetric-tree',
      title: 'Symmetric Tree',
      difficulty: 'Easy',
      category: 'Tree',
      description: 'Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).',
      example: {
        input: 'root = [1,2,2,3,4,4,3]',
        output: 'true',
        explanation: 'The binary tree is symmetric.'
      },
      solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_symmetric(root):
    """Symmetric Tree solution using recursion"""
    if not root:
        return True
    return is_mirror(root.left, root.right)

def is_mirror(left, right):
    """Helper function to check if two trees are mirrors"""
    if not left and not right:
        return True
    if not left or not right:
        return False
    return (left.val == right.val and 
            is_mirror(left.left, right.right) and 
            is_mirror(left.right, right.left))

# Example usage
# Create symmetric tree: [1,2,2,3,4,4,3]
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(2)
root.left.left = TreeNode(3)
root.left.right = TreeNode(4)
root.right.left = TreeNode(4)
root.right.right = TreeNode(3)

result = is_symmetric(root)
print(f"Input: root = [1,2,2,3,4,4,3]")
print(f"Output: {result}")`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)'
    },
    {
      id: 'valid-anagram',
      title: 'Valid Anagram',
      difficulty: 'Easy',
      category: 'String',
      description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
      example: {
        input: 's = "anagram", t = "nagaram"',
        output: 'true',
        explanation: 'Both strings contain the same characters with the same frequency.'
      },
      solution: `def is_anagram(s, t):
    """Valid Anagram solution using character counting"""
    if len(s) != len(t):
        return False
    
    # Count characters in both strings
    char_count = {}
    
    for char in s:
        char_count[char] = char_count.get(char, 0) + 1
    
    for char in t:
        if char not in char_count:
            return False
        char_count[char] -= 1
        if char_count[char] < 0:
            return False
    
    return True

# Alternative solution using sorted strings
def is_anagram_sorted(s, t):
    """Valid Anagram solution using sorting"""
    return sorted(s) == sorted(t)

# Example usage
s = "anagram"
t = "nagaram"
result = is_anagram(s, t)
print(f"Input: s = '{s}', t = '{t}'")
print(f"Output: {result}")`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 'missing-number',
      title: 'Missing Number',
      difficulty: 'Easy',
      category: 'Math',
      description: 'Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.',
      example: {
        input: 'nums = [3,0,1]',
        output: '2',
        explanation: 'n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number.'
      },
      solution: `def missing_number(nums):
    """Missing Number solution using sum"""
    n = len(nums)
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(nums)
    return expected_sum - actual_sum

# Alternative solution using XOR
def missing_number_xor(nums):
    """Missing Number solution using XOR"""
    result = len(nums)
    for i, num in enumerate(nums):
        result ^= i ^ num
    return result

# Example usage
nums = [3, 0, 1]
result = missing_number(nums)
print(f"Input: nums = {nums}")
print(f"Output: {result}")`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 'move-zeroes',
      title: 'Move Zeroes',
      difficulty: 'Easy',
      category: 'Arrays',
      description: 'Given an integer array nums, move all 0\'s to the end of it while maintaining the relative order of the non-zero elements.',
      example: {
        input: 'nums = [0,1,0,3,12]',
        output: '[1,3,12,0,0]',
        explanation: 'All non-zero elements maintain their relative order, and all zeroes are moved to the end.'
      },
      solution: `def move_zeroes(nums):
    """Move Zeroes solution using two pointers"""
    non_zero_index = 0
    
    # Move all non-zero elements to the front
    for i in range(len(nums)):
        if nums[i] != 0:
            nums[non_zero_index] = nums[i]
            non_zero_index += 1
    
    # Fill the rest with zeros
    for i in range(non_zero_index, len(nums)):
        nums[i] = 0

# Example usage
nums = [0, 1, 0, 3, 12]
move_zeroes(nums)
print(f"Input: nums = [0,1,0,3,12]")
print(f"Output: {nums}")`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 'longest-substring',
      title: 'Longest Substring Without Repeating Characters',
      difficulty: 'Medium',
      category: 'String',
      description: 'Given a string s, find the length of the longest substring without repeating characters.',
      example: {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.'
      },
      solution: `def length_of_longest_substring(s):
    """Longest Substring Without Repeating Characters using sliding window"""
    char_map = {}
    left = 0
    max_length = 0
    
    for right, char in enumerate(s):
        if char in char_map and char_map[char] >= left:
            left = char_map[char] + 1
        char_map[char] = right
        max_length = max(max_length, right - left + 1)
    
    return max_length

# Example usage
s = "abcabcbb"
result = length_of_longest_substring(s)
print(f"Input: s = '{s}'")
print(f"Output: {result}")`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(min(m, n))'
    },
    {
      id: 'container-with-water',
      title: 'Container With Most Water',
      difficulty: 'Medium',
      category: 'Arrays',
      description: 'Given n non-negative integers height where each represents a point at coordinate (i, height[i]), find two lines that together with the x-axis form a container that would hold the maximum amount of water.',
      example: {
        input: 'height = [1,8,6,2,5,4,8,3,7]',
        output: '49',
        explanation: 'The maximum area is obtained by choosing height[1] = 8 and height[8] = 7.'
      },
      solution: `def max_area(height):
    """Container With Most Water using two pointers"""
    left, right = 0, len(height) - 1
    max_area = 0
    
    while left < right:
        width = right - left
        h = min(height[left], height[right])
        area = width * h
        max_area = max(max_area, area)
        
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    
    return max_area

# Example usage
height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
result = max_area(height)
print(f"Input: height = {height}")
print(f"Output: {result}")`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 'three-sum',
      title: '3Sum',
      difficulty: 'Medium',
      category: 'Arrays',
      description: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.',
      example: {
        input: 'nums = [-1,0,1,2,-1,-4]',
        output: '[[-1,-1,2],[-1,0,1]]',
        explanation: 'The triplets that sum to zero are [-1,-1,2] and [-1,0,1].'
      },
      solution: `def three_sum(nums):
    """3Sum solution using sorting and two pointers"""
    nums.sort()
    result = []
    
    for i in range(len(nums) - 2):
        # Skip duplicates
        if i > 0 and nums[i] == nums[i-1]:
            continue
        
        left, right = i + 1, len(nums) - 1
        
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            
            if total == 0:
                result.append([nums[i], nums[left], nums[right]])
                
                # Skip duplicates
                while left < right and nums[left] == nums[left+1]:
                    left += 1
                while left < right and nums[right] == nums[right-1]:
                    right -= 1
                
                left += 1
                right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1
    
    return result

# Example usage
nums = [-1, 0, 1, 2, -1, -4]
result = three_sum(nums)
print(f"Input: nums = {nums}")
print(f"Output: {result}")`,
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 'add-two-numbers',
      title: 'Add Two Numbers',
      difficulty: 'Medium',
      category: 'Linked List',
      description: 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit.',
      example: {
        input: 'l1 = [2,4,3], l2 = [5,6,4]',
        output: '[7,0,8]',
        explanation: '342 + 465 = 807.'
      },
      solution: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def add_two_numbers(l1, l2):
    """Add Two Numbers solution"""
    dummy = ListNode(0)
    current = dummy
    carry = 0
    
    while l1 or l2 or carry:
        x = l1.val if l1 else 0
        y = l2.val if l2 else 0
        
        total = x + y + carry
        carry = total // 10
        
        current.next = ListNode(total % 10)
        current = current.next
        
        if l1:
            l1 = l1.next
        if l2:
            l2 = l2.next
    
    return dummy.next

# Example usage
# Create l1: 2 -> 4 -> 3
l1 = ListNode(2)
l1.next = ListNode(4)
l1.next.next = ListNode(3)

# Create l2: 5 -> 6 -> 4
l2 = ListNode(5)
l2.next = ListNode(6)
l2.next.next = ListNode(4)

result = add_two_numbers(l1, l2)
print("Result:")
current = result
while current:
    print(current.val, end=" -> " if current.next else "")
    current = current.next`,
      timeComplexity: 'O(max(m, n))',
      spaceComplexity: 'O(max(m, n))'
    },
    {
      id: 'longest-palindromic',
      title: 'Longest Palindromic Substring',
      difficulty: 'Medium',
      category: 'String',
      description: 'Given a string s, return the longest palindromic substring in s.',
      example: {
        input: 's = "babad"',
        output: '"bab"',
        explanation: '"aba" is also a valid answer.'
      },
      solution: `def longest_palindrome(s):
    """Longest Palindromic Substring using expand around center"""
    def expand_around_center(left, right):
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return s[left + 1:right]
    
    if not s:
        return ""
    
    start = 0
    max_length = 1
    
    for i in range(len(s)):
        # Check odd length palindromes
        len1 = len(expand_around_center(i, i))
        # Check even length palindromes
        len2 = len(expand_around_center(i, i + 1))
        
        max_len = max(len1, len2)
        if max_len > max_length:
            max_length = max_len
            start = i - (max_len - 1) // 2
    
    return s[start:start + max_length]

# Example usage
s = "babad"
result = longest_palindrome(s)
print(f"Input: s = '{s}'")
print(f"Output: '{result}'")`,
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 'median-of-arrays',
      title: 'Median of Two Sorted Arrays',
      difficulty: 'Hard',
      category: 'Arrays',
      description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
      example: {
        input: 'nums1 = [1,3], nums2 = [2]',
        output: '2.0',
        explanation: 'The merged array is [1,2,3] and the median is 2.'
      },
      solution: `def find_median_sorted_arrays(nums1, nums2):
    """Median of Two Sorted Arrays using binary search"""
    # Ensure nums1 is the smaller array
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    
    m, n = len(nums1), len(nums2)
    left, right = 0, m
    
    while left <= right:
        # Partition nums1
        partition_x = (left + right) // 2
        partition_y = (m + n + 1) // 2 - partition_x
        
        # Find the four elements around the partition
        max_left_x = float('-inf') if partition_x == 0 else nums1[partition_x - 1]
        min_right_x = float('inf') if partition_x == m else nums1[partition_x]
        max_left_y = float('-inf') if partition_y == 0 else nums2[partition_y - 1]
        min_right_y = float('inf') if partition_y == n else nums2[partition_y]
        
        # Check if partition is correct
        if max_left_x <= min_right_y and max_left_y <= min_right_x:
            # Found the correct partition
            if (m + n) % 2 == 0:
                return (max(max_left_x, max_left_y) + min(min_right_x, min_right_y)) / 2
            else:
                return max(max_left_x, max_left_y)
        elif max_left_x > min_right_y:
            right = partition_x - 1
        else:
            left = partition_x + 1
    
    return 0.0

# Example usage
nums1 = [1, 3]
nums2 = [2]
result = find_median_sorted_arrays(nums1, nums2)
print(f"Input: nums1 = {nums1}, nums2 = {nums2}")
print(f"Output: {result}")`,
      timeComplexity: 'O(log(min(m, n)))',
      spaceComplexity: 'O(1)'
    },
    {
      id: 'regular-expression',
      title: 'Regular Expression Matching',
      difficulty: 'Hard',
      category: 'Dynamic Programming',
      description: 'Given an input string s and a pattern p, implement regular expression matching with support for \'.\' and \'*\'.',
      example: {
        input: 's = "aa", p = "a*"',
        output: 'true',
        explanation: '"a*" means zero or more of the preceding element, \'a\'.'
      },
      solution: `def is_match(s, p):
    """Regular Expression Matching using dynamic programming"""
    m, n = len(s), len(p)
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    
    # Empty pattern matches empty string
    dp[0][0] = True
    
    # Handle patterns like a*, a*b*, etc.
    for j in range(1, n + 1):
        if p[j - 1] == '*':
            dp[0][j] = dp[0][j - 2]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if p[j - 1] == '.' or p[j - 1] == s[i - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            elif p[j - 1] == '*':
                dp[i][j] = dp[i][j - 2]  # Zero occurrence
                if p[j - 2] == '.' or p[j - 2] == s[i - 1]:
                    dp[i][j] = dp[i][j] or dp[i - 1][j]
    
    return dp[m][n]

# Example usage
s = "aa"
p = "a*"
result = is_match(s, p)
print(f"Input: s = '{s}', p = '{p}'")
print(f"Output: {result}")`,
      timeComplexity: 'O(mn)',
      spaceComplexity: 'O(mn)'
    },
    {
      id: 'merge-k-sorted',
      title: 'Merge k Sorted Lists',
      difficulty: 'Hard',
      category: 'Linked List',
      description: 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list.',
      example: {
        input: 'lists = [[1,4,5],[1,3,4],[2,6]]',
        output: '[1,1,2,3,4,4,5,6]',
        explanation: 'Merging the three sorted linked lists.'
      },
      solution: `import heapq

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_k_lists(lists):
    """Merge k Sorted Lists using min heap"""
    if not lists:
        return None
    
    # Create min heap with first element from each list
    heap = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst.val, i, lst))
    
    dummy = ListNode(0)
    current = dummy
    
    while heap:
        val, list_idx, node = heapq.heappop(heap)
        current.next = ListNode(val)
        current = current.next
        
        # Add next element from the same list
        if node.next:
            heapq.heappush(heap, (node.next.val, list_idx, node.next))
    
    return dummy.next

# Example usage
# Create lists: [[1,4,5],[1,3,4],[2,6]]
list1 = ListNode(1)
list1.next = ListNode(4)
list1.next.next = ListNode(5)

list2 = ListNode(1)
list2.next = ListNode(3)
list2.next.next = ListNode(4)

list3 = ListNode(2)
list3.next = ListNode(6)

lists = [list1, list2, list3]
result = merge_k_lists(lists)

print("Merged list:")
current = result
while current:
    print(current.val, end=" -> " if current.next else "")
    current = current.next`,
      timeComplexity: 'O(n log k)',
      spaceComplexity: 'O(k)'
    },
    {
      id: 'sliding-window-max',
      title: 'Sliding Window Maximum',
      difficulty: 'Hard',
      category: 'Arrays',
      description: 'You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right.',
      example: {
        input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3',
        output: '[3,3,5,5,6,7]',
        explanation: 'The maximum values in each sliding window of size 3.'
      },
      solution: `from collections import deque

def max_sliding_window(nums, k):
    """Sliding Window Maximum using monotonic deque"""
    if not nums or k == 0:
        return []
    
    result = []
    dq = deque()
    
    for i in range(len(nums)):
        # Remove elements outside the current window
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        
        # Remove smaller elements from the back
        while dq and nums[dq[-1]] < nums[i]:
            dq.pop()
        
        dq.append(i)
        
        # Add maximum for current window
        if i >= k - 1:
            result.append(nums[dq[0]])
    
    return result

# Example usage
nums = [1, 3, -1, -3, 5, 3, 6, 7]
k = 3
result = max_sliding_window(nums, k)
print(f"Input: nums = {nums}, k = {k}")
print(f"Output: {result}")`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(k)'
    }
  ];

  const currentProblem = problems.find(problem => problem.id === selectedProblem);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Practice Problems
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Solve real coding interview problems with step-by-step solutions and complexity analysis.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-1 space-y-4"
        >
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Play className="h-5 w-5 mr-2" />
              Choose Problem
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {problems.map((problem) => (
                <button
                  key={problem.id}
                  onClick={() => setSelectedProblem(problem.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    selectedProblem === problem.id
                      ? 'bg-primary-100 text-primary-700 border border-primary-200'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{problem.title}</div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {problem.difficulty}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{problem.category}</div>
                </button>
              ))}
            </div>
          </div>

          {currentProblem && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Complexity Analysis
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Time Complexity:</span>
                  <span className="font-mono text-primary-600">{currentProblem.timeComplexity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Space Complexity:</span>
                  <span className="font-mono text-primary-600">{currentProblem.spaceComplexity}</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-2 space-y-6"
        >
          {currentProblem && (
            <>
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentProblem.title}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      currentProblem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      currentProblem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {currentProblem.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {currentProblem.category}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{currentProblem.description}</p>

                {/* Example */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Example
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Input:</span>
                      <div className="font-mono bg-gray-50 p-2 rounded mt-1">
                        {currentProblem.example.input}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Output:</span>
                      <div className="font-mono bg-gray-50 p-2 rounded mt-1">
                        {currentProblem.example.output}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Explanation:</span>
                      <p className="text-gray-600 mt-1">{currentProblem.example.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Solution */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Python Solution
                </h3>
                <div className="code-block">
                  <pre className="text-sm">
{currentProblem.solution}
                  </pre>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Practice; 
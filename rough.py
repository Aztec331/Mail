try:
    print(10/0)
except ZeroDivisionError:
    print(f"10/0 is not applicable in real world mathematics")
    try:
        new_num= int(input("Enter a new value for division:"))
        new_num2= int(input("Enter another new value for division:"))
    except ValueError:
        print("please enter only numeric values")
        new_num= int(input("Enter a new value for division:"))
        new_num2= int(input("Enter another new value for division:"))

    print(new_num/new_num2)
import pyodbc
import datetime
from random import *
import json


con = pyodbc.connect("DRIVER={SQL Server};server=MININT-S0VERQS\SQLEXPRESS;database=Bonnie's")
cur = con.cursor()
######## 1  2  3  4  5  6  7  8  9  10 11 12 13
CurrentOrder = []#randint(0,4), randint(0,2), randint(0,2), randint(0,2), randint(0,2), randint(0,2), randint(0,2), randint(0,2), randint(0,2), randint(0,2), randint(0,2), randint(0,2), randint(0,2)]
CurrentCustomer = "1"#str(randint(1,2334))
with open('order.txt','r+') as f:
    i = 0
    for l in f:
        if l == "1\n" and i == 0:
            pass
        elif i == 1:
            CurrentCustomer = l
        elif i > 1:
            CurrentOrder.append(l.replace("""
""",""))
            
        else:
            break
        i += 1
    f.seek(0)
    f.write("0")
print CurrentOrder
CurrentId = 0

# Checking for new customer
cur.execute("SELECT [UserName] FROM Customer")
table = cur.fetchall()
counter = 0
for row in table:
    counter += 1
    if(row[0].strip() == CurrentCustomer):
        CurrentId = counter-1
        counter = 0
        break

if(counter == len(table)):
    cur.execute("INSERT INTO Customer ([UserName]) VALUES('"+CurrentCustomer+"');")
    CurrentId = counter


    
#Insert Into Order List

BinaryFoodCount = 0


cur.execute("SELECT MAX(OrderID) FROM EntireOrders")
MaxOrder = cur.fetchone()

if (MaxOrder[0] != None):
    OrderIndex = MaxOrder[0]+1
else:
    OrderIndex = 0
CurrentTime = datetime.datetime.now().strftime("%m %d %y %H:%M")
index = 0
for i in CurrentOrder:
    index += 1
    if (int(i)!= 0):
        cur.execute("INSERT INTO EntireOrders (CustomerID,OrderID,ItemID,QuantityList,OrderTime,EndTime,Status) VALUES("+str(CurrentId)+","+str(OrderIndex)+","+str(index)+","+str(i)+",'"+str(CurrentTime)+"','0',"+str(2)+")")
        
        BinaryFoodCount += 2**index 

        
# order increments after we clear all foods
OrderIndex += 1


###### Sending datat over to Staff
index = 0
with open("report.txt", 'r+') as f:
    if(f.readline()=="""1
"""):
        f.write("1")
    for i in CurrentOrder:
        if(int(i) != 0):
            f.write(CurrentId)
            f.write(OrderIndex)
            f.write(index)#food item
            f.write(i)#qty
            f.write(CurrentTime)  #order time
                    
        index += 1



con.commit()
cur.close()
con.close()

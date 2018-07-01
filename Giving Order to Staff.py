import pyodbc
import datetime
import random


OrderStatus = random.randint(0,2)

con = pyodbc.connect("DRIVER={SQL Server};server=MININT-S0VERQS\SQLEXPRESS;database=Bonnie's")
cur = con.cursor()


CurrentTime = datetime.datetime.now().strftime("%m %d %y %H:%M")

#cur.execute("UPDATE EntireOrders (EndTime, Status) VALUES('"+str(CurrentTime)"',"+str(OrderStatus)+")")












con.commit()
cur.close()
con.close()

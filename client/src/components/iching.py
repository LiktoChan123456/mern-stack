import numpy as np

list = []
count = 6

while True:
    every_list = np.random.choice(range(0,2),size=3,replace=True)
    if sum(every_list)==3:
        list.append("===O")
        print(every_list)
    elif sum(every_list)==2:
        list.append("= =")
        print(every_list)
    elif sum(every_list)==1:
        list.append("===")
        print(every_list)
    elif sum(every_list)==0:
        list.append("= =X")
        print(every_list)
    count -=1
    if count==0:
        break
    else:
        continue

list = list[::-1]



l_replace = [s.replace("= =X","===") for s in list]

ultimate_list = [q.replace("===O","= =") for q in l_replace]

  

list, ultimate_list = np.array(list), np.array(ultimate_list)
list= list.reshape(-1,1)
ultimate_list = ultimate_list.reshape(-1,1)
print("The obtained 6 indicators are: \n", list)

print("The transformed indicators are: \n", ultimate_list)
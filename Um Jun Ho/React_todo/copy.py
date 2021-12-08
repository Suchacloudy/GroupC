import copy

a = [1, [1, 2, 3]]
b = copy.copy(a)    # shallow copy 발생
print("얇은 복사한 b의 값은 ")
print(b)    # [1, [1, 2, 3]] 출력
b[0] = 100
print("0을 100으로 바꾼 b의 값은 ")    
print(b) 
# [100, [1, 2, 3]] 출력,
print("그에 따른 a의 값은")
print(a)    
# [1, [1, 2, 3]] 출력, shallow copy 가 발생해 복사된 리스트는 별도의 객체이므로 item을 수정하면 복사본만 수정된다. (immutable 객체의 경우)

c = copy.copy(a)
c[1].append(4)    
# 리스트의 두번째 item(내부리스트)에 4를 추가
print("2번째 값인 내부 리스트의 값을 변화한, 얇은 복사한 c의 값은 ")
print (c)  
# [1, [1, 2, 3, 4]] 출력
print("그에 따른 a의 값은 ")
print(a)    
# [1, [1, 2, 3, 4]] 출력, a가 c와 똑같이 수정된 이유는 리스트의 item 내부의 객체는 동일한 객체이므로 mutable한 리스트를 수정할때는 둘다 값이 변경됨

deep_a = [1, [1, 2, 3]]
deep_b = copy.deepcopy(deep_a)
print ("깊은 복사를 한 deep_b의 값은 ")
print(deep_b)
deep_b[0] = 100
print("0을 100으로 바꾼 deep_b의 값은 ")
print(deep_b)
deep_b[1].append(5)
print("2번째 값인 내부 리스트의 값을 변화한 deep_b의 값은")
print(deep_b)
print("그에 따른 a의 값은")
print(deep_a)
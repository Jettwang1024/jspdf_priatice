# BasicEIP_Frontend
Basic EIP (angular)

# Lazy Loading BrowserModule has already been loaded
Import 
rowserModule, 
BrowserAnimationsModule, 
HttpModule or 
HttpClientModule only once, preferably in your root module.

# JavaScript: var, let, const 差異
“const”
一般使用在識別值(identifier)不會被重新指定值。
例如：宣告恆定不做改變的變數 — const PI = 3.14159。這也意味著，const在宣告變數時就會進行初始化，無法等到之後再賦予值，因此必定要在一開始就給予值作宣告，否則將會報錯。

“let”
一般使用在變數(variable)可能會被重新指定值。例如：在迴圈(for loop)中，一開始的變數宣告使用。
也可以說較常使用在函式(function)自行定義的區塊(block)中，例如：迴圈(for loop)或者邏輯、數學等演算法括弧({} or ())中作宣告使用，而不會存在並使用於整個函式(function)中。

“var”
在ES6推出“let”宣告方法後，JavaScript最弱的變數宣告，使用在變數可能或不會被重新賦予值，或者宣告範圍在整個函式(function)或者區塊(block)中。

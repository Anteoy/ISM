/**
 * indexedDB数据库操作函数
 */
//异步API是指并不是这条指令执行完毕，我们就可以使用request.result来获取indexedDB对象了，就像使用ajax一样，语句执行完并不代表已经获取到了对象，所以我们一般在其回调函数中处理。
        function openDB (name,version, onSuccess, onError) {//请求的响应是一个 IDBDatabase对象 onSuccess是一个事件
            var version=version || 1;//请求打开的数据库的版本号和已经存在的数据库版本号
            var request=window.indexedDB.open(name,version);
            request.onerror=function(e){//请求失败的回调函数句柄
                console.log(e.currentTarget.error.message);//调式javascript用的。可以看到你在页面中输出的内容
                if (onError) {
                	onError(e);
            	}
            };
            request.onsuccess=function(e) {//请求成功的回调函数句柄
            	myDB.db=e.target.result;//回调函数中，把request获取的DB对象赋值给了myDB的db属性，这样就可以使用myDB.db来访问创建的indexedDB
            	if (onSuccess) {
            		onSuccess(e);
            	}
            };
            //对新数据的操作都需要在transaction中进行，而transaction又要求指定object store，所以我们只能在创建数据库的时候初始化object store以供后面使用，这正是onupgradeneeded的一个重要作用
            request.onupgradeneeded=function(e){//请求打开的数据库的版本号和已经存在的数据库版本号不一致的时候调用
                var db=e.target.result;//把request获取的DB对象赋值给了db，这样就可以使用db来访问创建的indexedDB
                if(!db.objectStoreNames.contains('liaotjl')){//如果没有这个objectStore
                    var store=db.createObjectStore('liaotjl',{keyPath: 'id'});//使用每条记录中的某个指定字段作为键值（keyPath）
                    //使用object store的createIndex创建索引 索引名称，索引字段名，索引属性值是否唯一
                    store.createIndex('nameIndex','id',{unique:true}); //唯一
                    store.createIndex('ageIndex','name',{unique:false}); //不唯一
                }
                console.log('DB version changed to '+version);
            };
        }
		
        
        function closeDB(db){//关闭数据库
            db.close();
        }

        function deleteDB(name){
            indexedDB.deleteDatabase(name);
        }

        function addDt(db,storeName){//增加数据
            var transaction=db.transaction(storeName,'readwrite'); //新事务对象
            var store=transaction.objectStore(storeName); //事务下objectStore对象

            for(var i=0;i<students.length;i++){//加入数据students数组
                store.add(students[i]);
            }
        }

        //自定义需求增加数据	XXX
			function addData(db,storeName,value){//增加数据库，表，值
					var transaction=db.transaction(storeName,'readwrite'); //新事务对象
					var store=transaction.objectStore(storeName); //事务下objectStore对象
					store.put(value);
			}
        
        function getDataByKey(db,storeName,value){//通过键获取数据，这里使用keyPath做键
            var transaction=db.transaction(storeName,'readwrite'); //新事务对象
            var store=transaction.objectStore(storeName); //事务下objectStore对象
            var request=store.get(value); //通过键获取数据，这里使用keyPath做键
            request.onsuccess=function(e){ //成功后回调函数
                var person=e.target.result; //把request获取的对象赋值给了student
                console.log(person.src); //控制台打印student的名字 TODO
                return person;//TODO XXX
            };
        }

        function updateDataByKey(db,storeName,value){//更新数据自动替换键值相同的记录，达到更新目的，没有相同的则添加
            var transaction=db.transaction(storeName,'readwrite'); //新事务对象
            var store=transaction.objectStore(storeName); //事务下objectStore对象
            var request=store.get(value); //通过键获取数据，这里使用keyPath做键
            request.onsuccess=function(e){ //成功后回调函数
                var student=e.target.result; //把request获取的对象赋值给了student
                student.age=35;//变更此得到的student数据age属性值为35
                store.put(student); //更新数据
            };
        }

        function deleteDataByKey(db,storeName,value){//根据键值删除记录
            var transaction=db.transaction(storeName,'readwrite'); //新事务对象
            var store=transaction.objectStore(storeName); //事务下objectStore对象
            store.delete(value); //根据键值删除记录 TODO XXX
        }

        function clearObjectStore(db,storeName){//clear方法可以清空object store
            var transaction=db.transaction(storeName,'readwrite'); //新事务对象
            var store=transaction.objectStore(storeName); //事务下objectStore对象
            store.clear();//clear方法可以清空object store
        }

        function deleteObjectStore(db,storeName){//根据objectStore name删除整个objectStore
            var transaction=db.transaction(storeName,'versionchange'); //版本变更
            db.deleteObjectStore(storeName);
        }

        
        /**
         * 利用游标获取全部未读取消息	现已融合添加更新读取状态功能
         * @param db 数据库对象
         * @param storeName 表对象
         * @param src 来源用户编号
         * @param onSuccess 成功事件
         * @returns
         */
        function fetchStoreByCursorwd(db, storeName, src, onSuccess){//利用游标遍历object store 新增传入参数src用户ID
            var transaction=db.transaction(storeName,'readwrite');//新事务对象
            var store=transaction.objectStore(storeName);//事务下objectStore对象
            var request=store.openCursor();//object store的openCursor()方法打开游标
            var value;var i = 0;
            var arr = new Array;
            request.onsuccess=function(e){//回调句柄
                var cursor=e.target.result;//获得结果
                if(cursor){
                	value = cursor.value; 
                	if(value.src==src		){//是否开启预读新消息功能 &&	value.newMsg==0
                		console.log(value.send_time);//TODO
                		value.newMsg = 1;  // 更新读取状态为已读
                		store.put(value); //更新数据
                		arr[i]=value;
                		i=i+1;
                	}
                    cursor.continue();//使游标下移，直到没有数据返回undefined
                } else { // 已经没有数据了， 循环完毕
                	if (onSuccess) {
                		onSuccess(arr);
                	}
                }
            };
        }

        
        /**
         * zaix.html利用游标获取全部消息	并载入
         * @param db 数据库对象
         * @param storeName 表对象
         * @param src 来源用户编号
         * @param onSuccess 成功事件
         * @returns
         */
        function fetchStoreByCursorzaix(db, storeName, onSuccess){//利用游标遍历object store XXX 
            var transaction=db.transaction(storeName,'readwrite');//新事务对象
            var store=transaction.objectStore(storeName);//事务下objectStore对象
            var request=store.openCursor();//object store的openCursor()方法打开游标
            var value;var i = 0;
            var arr = new Array;
            request.onsuccess=function(e){//回调句柄
                var cursor=e.target.result;//获得结果
                if(cursor){
                	value = cursor.value; 
                	arr[i]=value;
            		i=i+1;
                	/*if(value.src==src		){//是否开启预读新消息功能 &&	value.newMsg==0
                		console.log(value.send_time);//TODO
                		value.newMsg = 1;  // 更新读取状态为已读
                		store.put(value); //更新数据
                		arr[i]=value;
                		i=i+1;
                	}*/
                    cursor.continue();//使游标下移，直到没有数据返回undefined
                } else { // 已经没有数据了， 循环完毕
                	if (onSuccess) {
                		onSuccess(arr);
                	}
                }
            };
        }
        
        //利用游标获取全部标记为已经读取信息
        function fetchStoreByCursoryd(db,storeName){//利用游标遍历object store
            var transaction=db.transaction(storeName,'readwrite');//新事务对象
            var store=transaction.objectStore(storeName);//事务下objectStore对象
            var request=store.openCursor();//object store的openCursor()方法打开游标
            request.onsuccess = function(event) {
          	  var cursor = event.target.result;
          	  
          	  var value;
          	  var updateRequest;
          	  if (cursor) {
          		value = cursor.value; 
          	    if (cursor.key == "12") {
          	      value = cursor.value;  // 取得当前值
          	      value.id = "1";  // 更新密码 TODO 删除老的
          	      store.put(value); //更新数据
          	    }
          	  }
          	};
        }
        
        function getDataByIndex(db,storeName){//利用索引获取数据
            var transaction=db.transaction(storeName);//新事务对象
            var store=transaction.objectStore(storeName);//事务下objectStore对象
            var index = store.index("ageIndex");//获得已建立的索引
            index.get(26).onsuccess=function(e){//事务下objectStore对象 
                var person=e.target.result;//回调查询结果	下一个对象
                console.log(person.id);//控制台输出
                return person;//TODO
            }
        }

   /*      指定游标范围
        index.openCursor()/index.openKeyCursor()方法在不传递参数的时候会获取object store所有记录，像上面例子一样我们可以对搜索进行筛选
        可以使用key range 限制游标中值的范围，把它作为第一个参数传给 openCursor() 或是 openKeyCursor()
        IDBKeyRange.only(value):只获取指定数据
        IDBKeyRange.lowerBound(value,isOpen)：获取最小是value的数据，第二个参数用来指示是否排除value值本身，也就是数学中的是否是开区间
        IDBKeyRange.upperBound(value,isOpen)：和上面类似，用于获取最大值是value的数据
        IDBKeyRange.bound(value1,value2,isOpen1,isOpen2)：不用解释了吧 */
        
        function getMultipleData(db,storeName){//结合游标使用索引,多重的多样的
            var transaction=db.transaction(storeName);//新事务对象
            var store=transaction.objectStore(storeName);//事务下objectStore对象
            var index = store.index("nameIndex");//获得游标
            var request=index.openCursor(null,IDBCursor.prev);//使用索引打开一个游标(null为默认值范围表示所有，表示从最后一个开始往前移游标)
            request.onsuccess=function(e){
                var cursor=e.target.result;//event.target都指向request对象
                if(cursor){
                    var student=cursor.value;
                    console.log(student.name);
                    cursor.continue();
                }
            }
        }
import Mock from 'mockjs';

Mock.mock("/user",/ost|get/i,{
    'items|1-10': [
        {
            "name|+1": [
                "Juddy",
                "Tommy",
                "Hallen"
            ]
        }
    ]
})
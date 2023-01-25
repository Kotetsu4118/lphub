<?php

use App\Models\Question;


class MyFunctions{
    
    
    public function random_language_id(int $seed){
        if($seed==0){
            return mt_rand(1, 2);
        }
        if($seed==1){
            return mt_rand(4, 5);
        }
    }
    
    public function random_user_id(int $seed){
        if($seed==0){
            return 1;
        }
        if($seed==1){
            return 17;
        }
        else{
            return 19;
        }
    }

}
?>
<x-app-layout>
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 py-4">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div class='p-4'>
                <div>
                    <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                        {{ $question->title }}
                    </h2>
                </div>
                
                <div class='flex'>
                    <div>
                        難易度(全ユーザ平均)：{{ round($question->level_hasmany_avg_level, 2) }}
                    </div>
                    
                    <div class='pl-5'>
                        いいね数：{{ $question->g4q_hasmany_count }}
                    </div>
                </div>
                
                @if(Auth::user() && Auth::user()->id != $question->user->id )
                <!--フラグ管理-->
                <form action='/questions/{{ $question->id }}/flags' method='POST'>
                    @csrf
                    @method('PUT')
                    <div class='flex'>
                        <div>
                            @component('components/complete_flag', ['complete_flag'=>$complete_flag])@endcomponent
                        </div>
                        
                        <div class='pl-3'>
                            @component('components/later_flag', ['later_flag'=>$later_flag])@endcomponent
                        </div>
 
                    
                        <div class="pl-3">
                            <x-primary-button>{{ __('フラグを更新') }}</x-primary-button>
                        </div>
                        
                    </div>
                </form>
                
                <!--難易度の評価-->
                <form action='/questions/{{ $question->id }}/level' method='POST'>
                    @csrf
                    @method('PUT')
                    <div class='flex py-2'>
                        <div class="form-group">
                            <label for="select_level"></label>
                            <select class="form-control w-72" id="select_level" name='level'>
                              
                                <!-- 15行目でやってるからいらない　-->
                                <!--横幅を広げて、項目を真ん中に持ってくる　-->
                                @if($selected_level==0 || $selected_level==NULL)
                                    <option hidden>この問題の難易度を評価する</option>
                                @endif
                                  
                                @for($level=1; $level<=10; $level++)
                                    <option class='items-center' value='{{ $level }}' @if($level == $selected_level) selected='selected' @endif>{{ $level }}</option>
                                @endfor
                            </select>
                        </div>
                        
                        <div class='py-2 pl-3'>
                            <x-primary-button>{{ __('難易度を更新') }}</x-primary-button>
                        </div>
                    </div>
                </form>
                @endif
                
                
                <!--問題内容-->
                <div class="p-4">
                    問題：
                    <br>
                    {{ $question->body }}
                </div>
                
                
                <div>
                    @component('components/simple_folding', ['label'=>'答え：', 'content'=>$question->answer])
                    @endcomponent
                </div>
                
                
                
                <div class='py-4 flex'>
                    <div class='pr-4'>
                        作成者：{{ $question->user->name }}
                    </div>
                        
                    <div class='pr-4'>
                        作成日：{{ $question->created_at }}
                    </div>
                    
                    <div>
                        更新日：{{ $question->updated_at }}
                    </div>
                </div>
                
                <!--タグの表示-->
                @include('layouts.tag_layout')
                
                @if(Auth::user() && Auth::user()->id != $question->user->id )
                    <form action='/questions{{ $question->id }}/good' method='POST'>
                    @csrf
                    @method('PUT')
                        <div class='flex py-2'>
                            <div>
                                <div>
                                    <label for="{{ $question->id }}_good" >いいね：</label>
                                    <input type='checkbox' id='{{ $question->id }}_good' value='{{ Auth::user()->id }}' name='good'
                                        @if($good) checked='checked' @endif
                                    >
                                </div>
                            </div>
                            
                            <div class='pl-3'>
                                <input type='submit' value='反映'>
                            </div>
                        </div>
                    </form>
                @endauth
                
                <!--編集の導線-->
                @if(Auth::user() && Auth::user()->id==$question->user->id)
                <div class="pt-2">
                    <a href="/questions/{{ $question->id }}/edit_q">
                        <x-primary-button class="">
                            {{ __('編集') }}
                        </x-primary-button>
                    </a>
                </div>
                @endif
            </div>
        </div>
    </div>
    
    <!--ここからはコメント系-->
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-2">
        <hr>

        <div class='font-semibold text-xl text-gray-800 leading-tight py-4'>
            コメント
        </div>
    
        <!--コメントの表示-->
            <!--後でペジネイトしたい-->
        @foreach($comments as $comment)
            <div class='pt-2'>
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class='p-4'>
                        
                        <div class='flex'>
                            <img class='h-8 w-auto' src='{{ $comment->user->user_icon_path }}'>
                            <div class='text-lg p-1'>
                                {{ $comment->user->name }}
                            </div>
                            
                            <!--右上に表示したい-->
                            <div align='right'>
                                {{ $comment->created_at }}
                            </div>
                        </div>
                    
                    
                        <div class='pt-2 px-6'>
                            {{ $comment->body }}
                        </div>
                        
                        <div class='flex py-2'>
                            <div>
                                いいね数：{{ $comment->g4c_hasmany_count }}
                            </div>
                        
                            @if( Auth::user() && Auth::user()->id != $comment->user->id )
                                <form action='/comment/{{ $comment->id }}/good' method='POST'>
                                @csrf
                                @method('PUT')
                                    <div class='flex pl-5'>
                                        <div>
                                            <div>
                                                <label for="{{ $comment->id }}_good" >いいね：</label>
                                                <input type='checkbox' id='{{ $comment->id }}_good' value='{{ Auth::user()->id }}' name='good'
                                                    @if($comment->g4c_hasmany_exists) checked='checked' @endif
                                                >
                                            </div>
                                        </div>
                                        
                                        <div class='pl-3'>
                                            <input type='submit' value='反映'>
                                        </div>
                                    </div>
                                </form>
                            @endif
                        </div>
                        
                        <!--コメントの編集の導線-->
                        @auth
                        @if($comment->user->id == Auth::user()->id)
                            <div>
                                <a href='/comment/{{ $comment->id }}/edit'>
                                
                                    <div class='pt-2'>
                                        <x-primary-button>{{ __('編集') }}</x-primary-button>
                                    </div>
                                    
                                </a>
                            </div>
                        @endif
                        @endauth
                    </div>
                </div>
            </div>
        @endforeach
        
        <!--コメントの投稿-->
        @auth
            <div class='py-4'>
                <form action='/questions/{{ $question->id }}/comment' method='POST'>
                @csrf
                    <div>
                        <x-input-label for="comment" :value="__('コメントを入力：')" />
                        <x-text-input id='comment' name='comment' class="mt-1 block w-full h-20" :value="old('comment')" />
                        <x-input-error :messages="$errors->get('comment')" class="mt-2" />
                    </div>
                    <div class='pt-2'>
                        <x-primary-button>{{ __('送信') }}</x-primary-button>
                    </div>
                </form>
            </div>
        @endauth
        
        @guest
            <div class='py-4'>
                ログインするとコメントできます！！！！
            </div>
        @endguest
        
    </div>
    
</x-app-layout>
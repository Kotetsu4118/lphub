<x-app-layout>
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 py-4">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div class='p-4'>
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                    {{ $question->title }}
                </h2>
                
                @auth
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
                @endauth
                
                
                
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
                
                @include('layouts.tag_layout')
                
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
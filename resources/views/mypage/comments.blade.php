<x-app-layout>
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-2">
        <div class='py-2' align='center'>
            作成したコメント
        </div>
        @foreach( array_map(NULL, $questions, $comments_group) as [$question, $group] )
            <div>
                <details open>
                    <summary>問題：{{  $question[0]['title']  }} へのコメント</summary>
                    
                    @foreach( $group as $comment )
                        <div class="py-2">
                            <div class='py-2 pl-3'>
                                <a href='/questions/{{ $question[0]['id'] }}'>
                                    問題を確認
                                </a>
                            </div>
                            <div class='max-w-6xl mx-auto sm:px-6 lg:px-8'>
                                    <div class=" bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                        <div class="p-2">
                                            <div class="flex justify-between">
                                                <div>
                                                    <div class="text-xl text-gray-900">
                                                        {{ $comment['body'] }}
                                                    </div>
                                                    
                                                    <div class='flex py-2'>
                                                        <div>
                                                            いいね数：{{ $comment['g4c_hasmany_count'] }}
                                                        </div>
                                                    
                                                    </div>
                                                    
                                                </div>
                                                
                                                <div align='right'>
                                                    <a href='/comment/{{ $comment['id'] }}/edit'>
                                                        <x-primary-button class="">{{ __('編集') }}</x-primary-button>
                                                    </a>
                                                </div>
                                                
                                                {{-- 枠内の右上に表示したい --}}
                                                {{--
                                                <div align="right">
                                                    コメントした日：{{ $comment['created_at'] }}
                                                </div>
                                                --}}
                                                
                                            </div>
                                        </div>
                                    </div>
                                
                            </div>
                        </div>
                    @endforeach
                    
                </details>
            </div>
        @endforeach

    </div>
    
    
</x-app-layout>
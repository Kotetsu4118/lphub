<div class="pt-2 pl-3">
    @if($method=='PUT')
    <form action='/mypage/delete_{{ $flag_type }}_flags' method='POST'>
    @else
    <form action='{{ route("delete_creates") }}' method='POST'>
    @endif
    @csrf
    @method($method)
        <div>
            @if($method=='PUT')<x-primary-button>{{ __('フラグを削除') }}</x-primary-button>
            @else<x-primary-button>{{ __('問題を削除') }}</x-primary-button>
            @endif
        </div>
    @foreach($questions as $question)
        <div class="py-2">
                <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 flex">
                    <div class='w-4'>
                        @if($method=='PUT')
                            <input type='checkbox' value='{{ $question->id }}' name='{{ $flag_type }}_flags[]'>
                        @else
                            <input type='checkbox' value='{{ $question->id }}' name='questions[]'>
                        @endif
                    </div>
                    <a href="/questions/{{ $question->id }}" >
                        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg flex-auto">
                            <div class="p-2">
                                <div class="flex justify-between">
                                    <div class="text-xl text-gray-900">
                                        {{ $question->title }}
                                    </div>
                                    {{-- 枠内の右上に表示したい --}}
                                    <div align="right">
                                        更新日：{{ $question->updated_at }}
                                    </div>
                                </div>
                                
                                <div class="py-4 pl-3 text-gray-900">
                                    {{ $question->body }}
                                </div>
                                
                                @if($question->dummy_level_avg_level)
                                    <div>
                                        難易度：{{ round($question->dummy_level_avg_level, 2) }}
                                    </div>
                                @else
                                    <div>
                                        難易度：未評価    
                                    </div>
                                @endif
                                
                                <div class='flex space-x-8'>
                                    <div>
                                        作成者：{{ $question->user->name }}
                                    </div>
                                
                                    @include('layouts.tag_layout')
                                </div>
                                
                                <div class='flex py-2'>
                                    <div>
                                        いいね数：{{ $question->g4q_hasmany_count }}
                                    </div>
                                
                                    @auth
                                        <form action='/questions{{ $question->id }}/good' method='POST'>
                                        @csrf
                                        @method('PUT')
                                            <div class='flex pl-5'>
                                                <div>
                                                    <div>
                                                        <label for="{{ $question->id }}_good" >いいね：</label>
                                                        <input type='checkbox' id='{{ $question->id }}_good' value='{{ Auth::user()->id }}' name='good'
                                                            @if($question->g4q_hasmany_exists) checked='checked' @endif
                                                        >
                                                    </div>
                                                </div>
                                                
                                                <div class='pl-3'>
                                                    <input type='submit' value='反映'>
                                                </div>
                                            </div>
                                        </form>
                                    @endauth
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                
        </div>
    @endforeach
    </form>
</div>
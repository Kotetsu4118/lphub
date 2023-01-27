<div class="pt-2">
    @foreach($questions as $question)
        <div class="py-2">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <a href="/questions/{{ $question->id }}" >
                    <div class=" bg-white overflow-hidden shadow-sm sm:rounded-lg">
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
                            
                            @if($question->level_hasmany_avg_level)
                                <div class='py-2'>
                                    難易度：{{ round($question->level_hasmany_avg_level, 2) }}
                                </div>
                            @else
                                <div class='py-2'>
                                    難易度：未評価
                                </div>
                            @endif
                            
                            <div class='flex space-x-8'>
                                <div>
                                    作成者：{{ $question->user->name }}
                                </div>
                            
                                @include('layouts.tag_layout')
                            </div>
                            
                            
                            <div class='py-2 flex'>
                                <div>
                                    いいね数：{{ $question->g4q_hasmany_count }}
                                </div>
                                
                                @if(Auth::user() && Auth::user()->id != $question->user->id )
                                <div class='pl-3'>
                                <form action='/questions{{ $question->id }}/good' method='POST'>
                                @csrf
                                @method('PUT')
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
                                </form>
                                @endif
                            </div>
                            
                        </div>
                    </div>
                </a>
            </div>
        </div>
    @endforeach

</div>


<div class="paginete">{{ $questions->links()}}</div>

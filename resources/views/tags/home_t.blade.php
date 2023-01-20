<x-app-layout>

    {{--    
    <div class="py-4 pl-3">
        @component('components/select_language',[
            'languages' => $languages,
            'selected'=>NULL,
        ])
        @endcomponent
    </div>
    --}}
    
    
    
    <div class="pt-2">
        <div class='pl-3'>
            検索結果：{{ $tag_name }}
        </div>
        
        
        @foreach($questions as $question)
            <div class="py-2">
                <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <a href="/questions/{{ $question->id }}" >
                        <div class=" bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div class="p-2">
                                <div class="flex">
                                    <div class="text-xl text-gray-900">
                                        {{ $question->title }}
                                    </div>
                                    {{-- 枠内の右上に表示したい --}}
                                    <div>
                                        {{ $question->updated_at }}
                                    </div>
                                </div>
                                
                                <div class="py-4 pl-3 text-gray-900">
                                    {{ $question->body }}
                                </div>
                                
                                <div class='flex space-x-8'>
                                    <div>
                                        作成者：{{ $question->user->name }}
                                    </div>
                                
                                    <div class='flex'>
                                        タグ：
                                        @foreach($question->tag as $tag)
                                            {{ $tag->name }}
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        @endforeach
    
    </div>
    
    <div class="paginete">{{ $questions->links()}}</div>
</x-app-layout>
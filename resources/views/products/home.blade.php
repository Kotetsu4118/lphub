<x-app-layout>

    
    <div class="py-4 pl-3">
        @component('components/select_language',[
            'languages' => $languages,
            'selected'=>NULL,
        ])
        @endcomponent
    </div>
    
    
    <div class="py-2 pl-3">
        <a href="/create_q">
            問題作成
        </a>
    </div>
    
    
    <div class="pt-2">
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
                                
                                <div class="p-1 text-gray-900">
                                    {{ $question->body }}
                                </div>
                                
                                <div class='flex'>
                                    tags:
                                    @foreach($question->tag as $tag)
                                        {{ $tag->name }}
                                    @endforeach
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
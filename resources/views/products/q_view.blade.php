<x-app-layout>
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 py-4">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <h2 class="p-4 font-semibold text-xl text-gray-800 leading-tight">
                {{ $question->title }}
            </h2>
            
            <div class="p-4">
                問題：
                <br>
                {{ $question->body }}
            </div>
            
            
            {{--
            <details>
                <summary>答え：</summary>
                
                <div class='p-4'>
                    {{ $question->answer }}
                </div>
            </details>
            --}}
            
            
            <div>
                @component('components/simple_folding', ['label'=>'答え：', 'content'=>$question->answer])
                @endcomponent
            </div>
            
            
            
            <div class='p-4'>
                作成者：{{ $question->user->name }}
            </div>
            
            <div class='p-4'>
                作成日：{{ $question->created_at }}　　更新日：{{ $question->updated_at }}
            </div>
            
            
            <div>
                @foreach($tags as $tag)
                    {{ $tag->name }}
                @endforeach
            </div>
            
            @if(Auth::user()!=NULL && Auth::user()->id==$question->user->id)
            <div class="py-4">
                <a href="/questions/{{ $question->id }}/edit_q">
                    <x-primary-button class="ml-4">
                        {{ __('編集') }}
                    </x-primary-button>
                </a>
            </div>
            @endif
            
            
            <div class="py-2">
                <a href="/">
                    <x-primary-button class="ml-4">
                        {{ __('Home') }}
                    </x-primary-button>
                </a>
            </div>
        </div>
    </div>
</x-app-layout>
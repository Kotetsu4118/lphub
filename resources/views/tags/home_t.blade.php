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
    </div>   
    
    @include('layouts.home')
        
    
        
</x-app-layout>
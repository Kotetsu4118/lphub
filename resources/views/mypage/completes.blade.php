<x-app-layout>
    <div align='center'>
        完了した問題
    </div>
    @component('components/questions_for_mypage', ['questions' => $questions, 'flag_type' => 'complete', 'method' => 'PUT'])@endcomponent
    
</x-app-layout>